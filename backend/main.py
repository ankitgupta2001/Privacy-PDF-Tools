from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from typing import List, Optional
import io
import asyncio
from contextlib import asynccontextmanager

try:
    import fitz  # PyMuPDF
    PYMUPDF_AVAILABLE = True
except ImportError:
    PYMUPDF_AVAILABLE = False
    print("Warning: PyMuPDF not available. PDF processing will use mock implementations.")

app = FastAPI(
    title="Privacy PDF Tools API",
    description="Secure PDF processing without storing files",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://localhost:3000", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Security headers middleware
@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response

# File size limit (25MB)
MAX_FILE_SIZE = 25 * 1024 * 1024

class PDFProcessor:
    """PDF processing utilities using in-memory operations only"""
    
    @staticmethod
    def validate_pdf(file_content: bytes) -> bool:
        """Validate if the file is a valid PDF"""
        return file_content.startswith(b'%PDF')
    
    @staticmethod
    def merge_pdfs(pdf_files: List[bytes]) -> bytes:
        """Merge multiple PDF files into one"""
        if not PYMUPDF_AVAILABLE:
            # Mock merged PDF for development
            return b'%PDF-1.4\n%Mock merged PDF content\n%%EOF'
        
        try:
            doc = fitz.open()
            for pdf_bytes in pdf_files:
                pdf_doc = fitz.open(stream=pdf_bytes, filetype="pdf")
                doc.insert_pdf(pdf_doc)
                pdf_doc.close()
            
            output = io.BytesIO()
            doc.save(output)
            doc.close()
            return output.getvalue()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"PDF merge failed: {str(e)}")
    
    @staticmethod
    def split_pdf(pdf_content: bytes, start_page: int, end_page: int) -> bytes:
        """Extract pages from PDF"""
        if not PYMUPDF_AVAILABLE:
            # Mock split PDF for development
            return b'%PDF-1.4\n%Mock split PDF content\n%%EOF'
        
        try:
            doc = fitz.open(stream=pdf_content, filetype="pdf")
            
            # Validate page numbers
            total_pages = len(doc)
            if start_page > total_pages or end_page > total_pages:
                doc.close()
                raise HTTPException(
                    status_code=400, 
                    detail=f"Page numbers exceed document length ({total_pages} pages)"
                )
            
            output_doc = fitz.open()
            output_doc.insert_pdf(doc, from_page=start_page-1, to_page=end_page-1)
            
            output = io.BytesIO()
            output_doc.save(output)
            doc.close()
            output_doc.close()
            return output.getvalue()
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"PDF split failed: {str(e)}")
    
    @staticmethod
    def compress_pdf(pdf_content: bytes, quality: str) -> bytes:
        """Compress PDF based on quality setting"""
        if not PYMUPDF_AVAILABLE:
            # Mock compressed PDF for development
            return b'%PDF-1.4\n%Mock compressed PDF content\n%%EOF'
        
        try:
            doc = fitz.open(stream=pdf_content, filetype="pdf")
            
            # Apply compression based on quality
            for page in doc:
                page.clean_contents()
                if quality == "low":
                    # More aggressive compression for low quality
                    page.apply_redactions(images=False)
            
            output = io.BytesIO()
            
            # Compression settings based on quality
            if quality == "low":
                doc.save(output, garbage=4, deflate=True, deflate_images=True, deflate_fonts=True)
            elif quality == "medium":
                doc.save(output, garbage=3, deflate=True, deflate_images=True)
            else:  # high quality
                doc.save(output, garbage=2, deflate=True)
            
            doc.close()
            return output.getvalue()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"PDF compression failed: {str(e)}")

pdf_processor = PDFProcessor()

@app.get("/")
async def root():
    return {
        "message": "Privacy PDF Tools API", 
        "status": "healthy",
        "pymupdf_available": PYMUPDF_AVAILABLE
    }

@app.get("/healthz")
async def health_check():
    return {
        "status": "healthy", 
        "service": "pdf-tools-api",
        "pymupdf_available": PYMUPDF_AVAILABLE
    }

@app.post("/merge")
async def merge_pdfs(files: List[UploadFile] = File(...)):
    """Merge multiple PDF files into one"""
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="At least 2 files required")
    
    pdf_contents = []
    
    try:
        for file in files:
            # Validate file size
            if hasattr(file, 'size') and file.size and file.size > MAX_FILE_SIZE:
                raise HTTPException(
                    status_code=400, 
                    detail=f"File {file.filename} exceeds 25MB limit"
                )
            
            # Read file content
            content = await file.read()
            
            # Check file size after reading
            if len(content) > MAX_FILE_SIZE:
                raise HTTPException(
                    status_code=400, 
                    detail=f"File {file.filename} exceeds 25MB limit"
                )
            
            # Validate PDF
            if not pdf_processor.validate_pdf(content):
                raise HTTPException(
                    status_code=400, 
                    detail=f"File {file.filename} is not a valid PDF"
                )
            
            pdf_contents.append(content)
        
        # Process PDFs in memory
        merged_pdf = pdf_processor.merge_pdfs(pdf_contents)
        
        # Create response stream
        return StreamingResponse(
            io.BytesIO(merged_pdf),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=merged.pdf"}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Merge operation failed: {str(e)}")
    
    finally:
        # Ensure memory cleanup
        pdf_contents.clear()

@app.post("/split")
async def split_pdf(
    file: UploadFile = File(...),
    start_page: int = Form(...),
    end_page: int = Form(...)
):
    """Split PDF by extracting specific pages"""
    try:
        # Read file content
        content = await file.read()
        
        # Validate file size
        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="File exceeds 25MB limit")
        
        # Validate PDF
        if not pdf_processor.validate_pdf(content):
            raise HTTPException(status_code=400, detail="Invalid PDF file")
        
        # Validate page numbers
        if start_page < 1 or end_page < 1:
            raise HTTPException(status_code=400, detail="Page numbers must be greater than 0")
        
        if start_page > end_page:
            raise HTTPException(status_code=400, detail="Start page must be <= end page")
        
        # Process PDF in memory
        split_pdf_content = pdf_processor.split_pdf(content, start_page, end_page)
        
        filename = f"split_pages_{start_page}-{end_page}.pdf"
        
        return StreamingResponse(
            io.BytesIO(split_pdf_content),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Split operation failed: {str(e)}")

@app.post("/compress")
async def compress_pdf(
    file: UploadFile = File(...),
    quality: str = Form(...)
):
    """Compress PDF with specified quality"""
    try:
        # Read file content
        content = await file.read()
        
        # Validate file size
        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="File exceeds 25MB limit")
        
        # Validate PDF
        if not pdf_processor.validate_pdf(content):
            raise HTTPException(status_code=400, detail="Invalid PDF file")
        
        # Validate quality setting
        if quality not in ["low", "medium", "high"]:
            raise HTTPException(status_code=400, detail="Invalid quality setting")
        
        # Process PDF in memory
        compressed_pdf = pdf_processor.compress_pdf(content, quality)
        
        filename = f"compressed_{file.filename}"
        
        return StreamingResponse(
            io.BytesIO(compressed_pdf),
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Compression operation failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)