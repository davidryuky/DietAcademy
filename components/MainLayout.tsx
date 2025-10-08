import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTopButton } from './ScrollToTopButton';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50">
      <Header />
      {/* Page-specific content will be rendered here */}
      {children}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};
