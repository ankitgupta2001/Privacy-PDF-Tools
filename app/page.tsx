import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ToolsSection } from '@/components/ToolsSection';
import { PrivacySection } from '@/components/PrivacySection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="md:hidden">
        <Header />
      </div>
      <Hero />
      <ToolsSection />
      <PrivacySection />
      <Footer />
    </div>
  );
}