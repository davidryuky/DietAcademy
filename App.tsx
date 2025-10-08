import React, { useState, useEffect } from 'react';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './components/HomePage';
import { TestPage } from './components/TestPage';

const App: React.FC = () => {
  // Get the current route from the URL hash, defaulting to '/'
  const getCurrentRoute = () => window.location.hash.substring(1) || '/';
  
  const [route, setRoute] = useState(getCurrentRoute());

  useEffect(() => {
    // Listen for changes to the URL hash
    const handleHashChange = () => {
      setRoute(getCurrentRoute());
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    switch (route) {
      case '/test':
        return <TestPage />;
      default:
        return <HomePage />;
    }
  };
  
  return (
    <MainLayout>
      {renderPage()}
    </MainLayout>
  );
};

export default App;