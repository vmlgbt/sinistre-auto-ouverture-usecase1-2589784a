
import React from 'react';
import { useEffect } from 'react';
import ContexteClientValidation from './ContexteClientValidation';

const Index: React.FC = () => {
  useEffect(() => {
    // Redirect to the main app since we're using a single-page application structure
    window.location.href = '/';
  }, []);

  const renderPage = () => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.get('page') === 'contexte-client-validation') {
      return <ContexteClientValidation />;
    }

    if (searchParams.get('page') === 'contexte-validation') {
      return <ContexteClientValidation />;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Chargement d'AXA Solaris...</h1>
          <p className="text-xl text-muted-foreground">Redirection en cours...</p>
        </div>
      </div>
    );
  };

  return renderPage();
};

export default Index;
