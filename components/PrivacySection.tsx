'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Server, Lock, Trash2, Zap } from 'lucide-react';

export function PrivacySection() {
  const features = [
    {
      icon: Shield,
      title: 'No File Storage',
      description: 'Your files are never saved to our servers. All processing happens in memory.',
      badge: 'Guaranteed'
    },
    {
      icon: Eye,
      title: 'No Tracking',
      description: 'We don\'t track your usage, store analytics, or collect personal data.',
      badge: 'Anonymous'
    },
    {
      icon: Server,
      title: 'Secure Processing',
      description: 'All PDF operations use industry-standard security protocols.',
      badge: 'Encrypted'
    },
    {
      icon: Lock,
      title: 'HTTPS Only',
      description: 'All data transmission is encrypted using HTTPS/TLS protocols.',
      badge: 'Secure'
    },
    {
      icon: Trash2,
      title: 'Auto Cleanup',
      description: 'Processed files are automatically deleted from memory after download.',
      badge: 'Auto-Delete'
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Optimized algorithms ensure quick processing without compromising security.',
      badge: 'Optimized'
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Privacy is Our Priority
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've built this platform with privacy-first principles. Your documents remain yours, 
            and we never store, analyze, or share your data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
                    <feature.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
          <div className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-bold mb-2">Privacy Guarantee</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We do not store, log, or have access to your PDF files. All processing is done locally 
              on our servers in memory only, and files are immediately discarded after processing. 
              This is our commitment to your privacy and security.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}