'use client';

import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Scissors, Download } from 'lucide-react';
import { toast } from 'sonner';

export function SplitTool() {
  const [file, setFile] = useState<File | null>(null);
  const [startPage, setStartPage] = useState('1');
  const [endPage, setEndPage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileSelected = (files: File[]) => {
    setFile(files[0]);
    setDownloadUrl(null);
  };

  const splitPDF = async () => {
    if (!file) {
      toast.error('Please select a PDF file to split');
      return;
    }

    if (!startPage || !endPage) {
      toast.error('Please specify both start and end page numbers');
      return;
    }

    const start = parseInt(startPage);
    const end = parseInt(endPage);

    if (start > end) {
      toast.error('Start page must be less than or equal to end page');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('start_page', startPage);
      formData.append('end_page', endPage);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 15;
        });
      }, 300);

      // Call FastAPI backend directly
      const response = await fetch('http://localhost:8000/split', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        toast.success('PDF split successfully!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to split PDF');
      }
    } catch (error) {
      console.error('Error splitting PDF:', error);
      toast.error('Failed to split PDF. Please ensure the backend is running on port 8000.');
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scissors className="h-5 w-5" />
          Split PDF
        </CardTitle>
        <CardDescription>
          Extract specific pages from a PDF document. Specify the page range you want to extract.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FileUpload
          onFilesSelected={handleFileSelected}
          acceptedTypes={['.pdf']}
          multiple={false}
          maxSize={25}
        />

        {file && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="font-medium text-sm">{file.name}</p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startPage">Start Page</Label>
            <Input
              id="startPage"
              type="number"
              min="1"
              value={startPage}
              onChange={(e) => setStartPage(e.target.value)}
              placeholder="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endPage">End Page</Label>
            <Input
              id="endPage"
              type="number"
              min="1"
              value={endPage}
              onChange={(e) => setEndPage(e.target.value)}
              placeholder="10"
            />
          </div>
        </div>

        {isProcessing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Splitting PDF...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={splitPDF}
            disabled={!file || isProcessing}
            className="flex-1"
          >
            {isProcessing ? 'Splitting...' : 'Split PDF'}
          </Button>

          {downloadUrl && (
            <Button variant="outline" asChild>
              <a href={downloadUrl} download={`split_pages_${startPage}-${endPage}.pdf`}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}