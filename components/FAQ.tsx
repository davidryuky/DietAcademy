import React from 'react';
import { FAQItem } from './FAQItem';
import { faqData } from '../constants';

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800">ダイエットについて よくある質問</h2>
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
