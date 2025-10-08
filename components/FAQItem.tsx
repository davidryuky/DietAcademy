import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg ${isOpen ? 'border-2 border-blue-500' : 'border-2 border-transparent'}`}>
      <button
        className="w-full flex justify-between items-center text-left p-5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-4">
              {question.substring(1, 2)}
            </div>
            <span className="text-md font-semibold text-slate-800 flex-1">{question.substring(3)}</span>
        </div>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors duration-300 ml-4">
            <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'} text-slate-500 group-hover:text-blue-500 transition-transform duration-300`}></i>
        </div>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-slate-700 space-y-4">
             <div className="border-t pt-4 prose prose-sm max-w-none">
                {answer}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};