'use client';

import { FileText, Github, Mail, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Privacy PDF Tools
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Professional PDF processing tools that respect your privacy. 
              Fast, secure, and completely free.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-purple-600 transition-colors">Merge PDFs</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Split PDF</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Compress PDF</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Convert PDF</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Privacy</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Data Handling</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                <Shield className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2025 Privacy PDF Tools. All rights reserved.
            </p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-600">
                100% Privacy Protected
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}