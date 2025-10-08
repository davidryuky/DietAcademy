import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg bg-white shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <button
        className="w-full flex justify-between items-center text-left p-4 md:p-5 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-start">
            <span className="text-lg font-bold text-blue-600 mr-3">{question.substring(0, 2)}</span>
            <span className="text-md font-semibold text-slate-800 flex-1">{question.substring(3)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 ml-4">
             <span className="hidden md:inline mr-2 text-xs transition-opacity duration-300">{isOpen ? '閉じる' : '回答を見る'}</span>
            <svg
            className={`w-5 h-5 text-slate-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </div>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="p-4 md:p-5 border-t border-slate-200 text-slate-600 space-y-4 bg-slate-50">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};