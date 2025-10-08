import React from 'react';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './components/HomePage';
import { TestPage } from './components/TestPage';

const App: React.FC = () => {
  const renderPage = () => {
    switch (window.location.pathname) {
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
