# Privacy-First PDF Tools

A modern web application for processing PDF files with complete privacy protection. Built with Next.js frontend and FastAPI backend, featuring a responsive sidebar navigation and dedicated tool pages.

## Features

### PDF Tools
- **Merge PDFs**: Combine multiple PDF files into one document
- **Split PDFs**: Extract specific pages from a PDF
- **Compress PDFs**: Reduce file size while maintaining quality

### Image Tools (Coming Soon)
- **Resize Images**: Adjust image dimensions
- **Convert Formats**: Convert between JPG, PNG, WebP, etc.
- **Enhance Quality**: AI-powered image enhancement

### Privacy & Security
- ✅ **No file storage** on servers
- ✅ **No data logging** or analytics
- ✅ **All processing in memory** only
- ✅ **Files auto-deleted** after processing
- ✅ **HTTPS encryption** for all transfers
- ✅ **No third-party tracking**

### User Experience
- 🎨 **Responsive design** with collapsible sidebar
- 🔍 **Search functionality** to find tools quickly
- 📱 **Mobile-friendly** interface
- ⚡ **Fast processing** with real-time progress
- 🎯 **Dedicated pages** for each tool

## Tech Stack

### Frontend
- **Next.js 13** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Lucide React** icons
- **Sonner** for toast notifications

### Backend
- **FastAPI** (Python) for API endpoints
- **PyMuPDF** for PDF processing
- **Uvicorn** ASGI server
- **In-memory processing** only

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── pdf/               # PDF tool pages
│   │   ├── merge/         # Merge PDFs page
│   │   ├── split/         # Split PDF page
│   │   └── compress/      # Compress PDF page
│   ├── image/             # Image tool pages (coming soon)
│   │   ├── resize/        # Resize image page
│   │   ├── convert/       # Convert format page
│   │   └── enhance/       # Enhance quality page
│   ├── layout.tsx         # Root layout with sidebar
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── tools/             # Tool-specific components
│   ├── ui/                # shadcn/ui components
│   ├── Layout.tsx         # Main layout wrapper
│   ├── Sidebar.tsx        # Navigation sidebar
│   └── ...
├── backend/               # FastAPI backend
│   ├── main.py            # API endpoints
│   ├── requirements.txt   # Python dependencies
│   └── Dockerfile         # Backend container
└── ...
```

## Getting Started

### Prerequisites
- **Node.js 18+**
- **Python 3.8+**
- **pip** package manager

### Frontend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open application:**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Use the sidebar to navigate between tools

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create environment file:**
```bash
cp .env.example .env
```

5. **Start the server:**
```bash
python -m uvicorn main:app --reload --port 8000
```

The API will be available at [http://localhost:8000](http://localhost:8000)

### Running Both Services

You can run both frontend and backend simultaneously:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run backend
```

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

## Navigation Features

### Sidebar Navigation
- **Collapsible design**: Toggle between expanded and collapsed states
- **Search functionality**: Find tools quickly with real-time filtering
- **Category organization**: Tools grouped by type (PDF, Image)
- **Active route highlighting**: Visual indication of current page
- **Mobile responsive**: Overlay mode on mobile devices

### Tool Pages
- **Dedicated routes**: Each tool has its own page (`/pdf/merge`, `/pdf/split`, etc.)
- **Consistent layout**: All tools follow the same design pattern
- **Progress indicators**: Real-time feedback during processing
- **Error handling**: Clear error messages and recovery options

## Deployment

### Frontend (Vercel/Netlify)

1. **Push code to GitHub**
2. **Import project** in your deployment platform
3. **Set build command**: `npm run build`
4. **Deploy**

### Backend (Railway/Render/Docker)

#### Using Docker:
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Using Docker Compose:
```bash
docker-compose up --build
```

## Security Features

- **File size limits** (25MB maximum)
- **File type validation** (PDF only for PDF tools)
- **CORS protection** with specific origins
- **Security headers** (CSP, HSTS, etc.)
- **Input sanitization** and validation
- **Memory-only processing** (no disk storage)

## Development

### Adding New Tools

1. **Create tool component** in `components/tools/`
2. **Add route page** in `app/[category]/[tool]/page.tsx`
3. **Update sidebar** menu in `components/Sidebar.tsx`
4. **Add backend endpoint** if needed

### Code Organization

- **Components**: Modular, reusable React components
- **Pages**: Next.js App Router pages with dedicated routes
- **Tools**: Self-contained tool components with their own state
- **UI**: shadcn/ui components for consistent design
- **Backend**: FastAPI with clear endpoint separation

## Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests** if applicable
5. **Submit a pull request**

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, create an issue on GitHub or contact the development team.

---

**Built with privacy in mind** 🔒 **No data stored** 🚀 **Lightning fast** ✨ **Production ready**