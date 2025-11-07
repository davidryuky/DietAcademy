import React from 'react';
import { useLocation } from 'react-router-dom';
import { LeftSidebar } from './LeftSidebar';

export const PageContentLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isMembersPage = location.pathname.startsWith('/members');

  return (
    <div className="flex-grow w-full max-w-7xl mx-auto flex flex-col md:flex-row px-4 pb-8">
      {!isMembersPage && <LeftSidebar />}
      <main className="w-full md:flex-1 py-8">
        {children}
      </main>
    </div>
  );
};
