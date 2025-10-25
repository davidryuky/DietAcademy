import React from 'react';
import { FAQItem } from './FAQItem';
import { faqData } from '../constants';

export const FAQ: React.FC = () => {
  return (
    <section id="faq">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          {/* Header Title */}
          <div className="bg-gradient-to-r from-rose-300 to-pink-300 text-white p-4 flex items-center justify-center text-center shadow-md">
              <i className="fas fa-question-circle text-3xl mr-4 hidden sm:block"></i>
              <h2 className="text-2xl md:text-3xl font-bold">ダイエットについて よくある質問</h2>
          </div>
          {/* Content Body */}
          <div className="p-4 md:p-5">
              <div className="space-y-4">
                  {faqData.map((item, index) => (
                      <FAQItem key={index} question={item.question} answer={item.answer} />
                  ))}
              </div>
          </div>
      </div>
    </section>
  );
};