'use client';

import { MergeTool } from '@/components/tools/MergeTool';

export default function MergePDFPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <MergeTool />
      </div>
    </div>
  );
}