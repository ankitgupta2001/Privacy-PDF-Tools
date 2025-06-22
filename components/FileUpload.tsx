'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, File, X } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  acceptedTypes: string[];
  multiple?: boolean;
  maxSize?: number; // in MB
}

export function FileUpload({ 
  onFilesSelected, 
  acceptedTypes, 
  multiple = false, 
  maxSize = 25 
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file: File): boolean => {
    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      toast.error(`Invalid file type. Accepted types: ${acceptedTypes.join(', ')}`);
      return false;
    }

    // Check file size
    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB > maxSize) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (validateFile(file)) {
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  return (
    <Card className={`border-2 border-dashed transition-colors ${
      dragActive 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-300 hover:border-gray-400'
    }`}>
      <CardContent className="p-6">
        <div
          className="text-center"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Drop your PDF files here
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            or click to browse your computer
          </p>
          
          <input
            type="file"
            accept={acceptedTypes.join(',')}
            multiple={multiple}
            onChange={handleChange}
            className="hidden"
            id="file-upload"
          />
          
          <Button asChild variant="outline">
            <label htmlFor="file-upload" className="cursor-pointer">
              <File className="h-4 w-4 mr-2" />
              Choose Files
            </label>
          </Button>
          
          <div className="mt-4 text-xs text-gray-500">
            <p>Supported formats: {acceptedTypes.join(', ')}</p>
            <p>Maximum file size: {maxSize}MB</p>
            {multiple && <p>You can select multiple files</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}