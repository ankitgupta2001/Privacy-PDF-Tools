'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crop } from 'lucide-react';

export default function ResizeImagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crop className="h-5 w-5" />
              Resize Image
            </CardTitle>
            <CardDescription>
              Resize your images to specific dimensions while maintaining quality.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-500">Image resize tool coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}