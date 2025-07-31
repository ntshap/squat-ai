
import React, { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import LiveAnalysis from '@/components/LiveAnalysis';
import UploadVideo from '@/components/UploadVideo';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'upload'>('live');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1">
          {activeTab === 'live' ? <LiveAnalysis /> : <UploadVideo />}
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
