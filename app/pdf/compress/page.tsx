'use client';

import { CompressTool } from '@/components/tools/CompressTool';

export default function CompressPDFPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <CompressTool />
      </div>
    </div>
  );
}