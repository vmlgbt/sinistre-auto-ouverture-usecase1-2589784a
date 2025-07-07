import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from '@/components/Header';
import ContexteClient from '@/pages/ContexteClient';
import Declaration from '@/pages/Declaration';
import Verification from '@/pages/Verification';
import Solutions from '@/pages/Solutions';

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState<'contexte' | 'declaration'>('contexte');
  const [currentUrl, setCurrentUrl] = useState(window.location.search);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentUrl(window.location.search);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple routing based on URL params
  const urlParams = new URLSearchParams(currentUrl);
  const currentPage = urlParams.get('page');

  const renderCurrentPage = () => {
    if (currentPage === 'verification') {
      return <Verification />;
    }
    if (currentPage === 'solutions') {
      return <Solutions />;
    }
    return activeTab === 'contexte' ? <ContexteClient /> : <Declaration />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-gray-50">
          {currentPage !== 'verification' && currentPage !== 'solutions' && (
            <Header activeTab={activeTab} onTabChange={setActiveTab} />
          )}
          <main>
            {renderCurrentPage()}
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
