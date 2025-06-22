# Privacy-First PDF Tools

A modern web application for processing PDF files with complete privacy protection. Built with Next.js frontend and FastAPI backend.

## Features

- **Merge PDFs**: Combine multiple PDF files into one document
- **Split PDFs**: Extract specific pages from a PDF
- **Compress PDFs**: Reduce file size while maintaining quality
- **100% Privacy**: No files stored, all processing in memory
- **Secure**: HTTPS encryption and security headers
- **Fast**: Optimized for performance

## Privacy Guarantees

- ✅ No file storage on servers
- ✅ No data logging or analytics
- ✅ All processing in memory only
- ✅ Files auto-deleted after processing
- ✅ HTTPS encryption for all transfers
- ✅ No third-party tracking

## Tech Stack

### Frontend
- Next.js 13 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

### Backend
- FastAPI (Python)
- PyMuPDF for PDF processing
- Uvicorn ASGI server
- In-memory processing only

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- pip package manager

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create environment file:
```bash
cp .env.example .env
```

5. Start the server:
```bash
python -m uvicorn main:app --reload --port 8000
```

The API will be available at [http://localhost:8000](http://localhost:8000)

## API Endpoints

### POST /merge
Merge multiple PDF files into one.

**Request**: Multipart form with PDF files
**Response**: Merged PDF file

### POST /split
Extract pages from a PDF file.

**Request**: 
- `file`: PDF file
- `start_page`: Starting page number
- `end_page`: Ending page number

**Response**: PDF with extracted pages

### POST /compress
Compress a PDF file.

**Request**:
- `file`: PDF file
- `quality`: Compression quality (low, medium, high)

**Response**: Compressed PDF file

### GET /healthz
Health check endpoint.

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set build command: `npm run build`
4. Deploy

### Backend (Railway/Render)

1. Create `Dockerfile`:
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

2. Deploy to your preferred platform

## Security Features

- File size limits (25MB)
- File type validation
- CORS protection
- Security headers
- Input sanitization
- Memory-only processing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@privacypdftools.com or create an issue on GitHub.