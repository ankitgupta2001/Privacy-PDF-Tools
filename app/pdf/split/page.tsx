'use client';

import { SplitTool } from '@/components/tools/SplitTool';

export default function SplitPDFPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <SplitTool />
      </div>
    </div>
  );
}