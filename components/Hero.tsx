'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, Shield, Zap, Lock } from 'lucide-react';

export function Hero() {
  const scrollToTools = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Privacy-First PDF Processing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Merge, split, and compress your PDFs with complete privacy. 
            All processing happens in your browser - we never store your files.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm">No File Storage</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <Lock className="h-4 w-4 text-blue-500" />
              <span className="text-sm">100% Secure</span>
            </div>
          </div>
          
          <Button 
            onClick={scrollToTools}
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started Free
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}