'use client';

import { MergeTool } from '@/components/tools/MergeTool';
import { SplitTool } from '@/components/tools/SplitTool';
import { CompressTool } from '@/components/tools/CompressTool';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Combine, Scissors, Minimize2 } from 'lucide-react';

export function ToolsSection() {
  return (
    <section id="tools" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            PDF Tools
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional PDF processing tools that work entirely in your browser. 
            Fast, secure, and completely private.
          </p>
        </div>

        <Tabs defaultValue="merge" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="merge" className="flex items-center gap-2">
              <Combine className="h-4 w-4" />
              Merge PDFs
            </TabsTrigger>
            <TabsTrigger value="split" className="flex items-center gap-2">
              <Scissors className="h-4 w-4" />
              Split PDF
            </TabsTrigger>
            <TabsTrigger value="compress" className="flex items-center gap-2">
              <Minimize2 className="h-4 w-4" />
              Compress PDF
            </TabsTrigger>
          </TabsList>

          <TabsContent value="merge">
            <MergeTool />
          </TabsContent>
          
          <TabsContent value="split">
            <SplitTool />
          </TabsContent>
          
          <TabsContent value="compress">
            <CompressTool />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}