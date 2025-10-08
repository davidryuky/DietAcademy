import React from 'react';
import { PageContentLayout } from './PageContentLayout';

export const TestPage: React.FC = () => {
  return (
    <PageContentLayout>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-slate-800">In testing</h1>
          <p className="mt-4 text-lg text-slate-600">This is a test page.</p>
        </div>
      </div>
    </PageContentLayout>
  );
};