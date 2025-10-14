import React from 'react';
import { FAQItem } from './FAQItem';
import { faqData } from '../constants';

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3">
            <i className="fas fa-question-circle text-3xl text-blue-500"></i>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800">
              ダイエットについて よくある質問 
            </h2>
          </div>
          <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
            ダイエットに関するよくある疑問や不明点を解決します。
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};
