'use client';

import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Minimize2, Download } from 'lucide-react';
import { toast } from 'sonner';

export function CompressTool() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [compressionInfo, setCompressionInfo] = useState<{
    originalSize: number;
    compressedSize: number;
    savings: number;
  } | null>(null);

  const handleFileSelected = (files: File[]) => {
    setFile(files[0]);
    setDownloadUrl(null);
    setCompressionInfo(null);
  };

  const compressPDF = async () => {
    if (!file) {
      toast.error('Please select a PDF file to compress');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('quality', quality);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 12;
        });
      }, 400);

      // Call FastAPI backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/compress`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        
        // Calculate compression stats
        const originalSize = file.size;
        const compressedSize = blob.size;
        const savings = Math.round(((originalSize - compressedSize) / originalSize) * 100);
        
        setCompressionInfo({
          originalSize,
          compressedSize,
          savings: Math.max(0, savings) // Ensure non-negative
        });
        
        toast.success(`PDF compressed successfully! Saved ${Math.max(0, savings)}% space.`);
      } else {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(errorData.detail || 'Failed to compress PDF');
      }
    } catch (error) {
      console.error('Error compressing PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to compress PDF: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Minimize2 className="h-5 w-5" />
          Compress PDF
        </CardTitle>
        <CardDescription>
          Reduce the file size of your PDF while maintaining quality. Choose compression level based on your needs.
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
              Original size: {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="quality">Compression Quality</Label>
          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger>
              <SelectValue placeholder="Select compression quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Quality (Smallest size)</SelectItem>
              <SelectItem value="medium">Medium Quality (Balanced)</SelectItem>
              <SelectItem value="high">High Quality (Larger size)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {compressionInfo && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Compression Results</h4>
            <div className="space-y-1 text-sm text-green-700">
              <p>Original: {(compressionInfo.originalSize / 1024 / 1024).toFixed(2)} MB</p>
              <p>Compressed: {(compressionInfo.compressedSize / 1024 / 1024).toFixed(2)} MB</p>
              <p className="font-medium">Space saved: {compressionInfo.savings}%</p>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Compressing PDF...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={compressPDF}
            disabled={!file || isProcessing}
            className="flex-1"
          >
            {isProcessing ? 'Compressing...' : 'Compress PDF'}
          </Button>

          {downloadUrl && (
            <Button variant="outline" asChild>
              <a href={downloadUrl} download={`compressed_${file?.name}`}>
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