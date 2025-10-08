import React from 'react';
import { LeftSidebar } from './LeftSidebar';

export const PageContentLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex-grow w-full max-w-7xl mx-auto flex flex-col md:flex-row px-4 pb-16">
      <LeftSidebar />
      <main className="w-full md:flex-1 py-8">
        {children}
      </main>
    </div>
  );
};