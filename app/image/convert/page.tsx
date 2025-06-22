'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCw } from 'lucide-react';

export default function ConvertImagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCw className="h-5 w-5" />
              Convert Image Format
            </CardTitle>
            <CardDescription>
              Convert images between different formats (JPG, PNG, WebP, etc.).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-500">Image format conversion tool coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}