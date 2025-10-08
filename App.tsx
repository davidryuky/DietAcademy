import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DietCalculator } from './components/DietCalculator';
import { FAQ } from './components/FAQ';
import { LeftSidebar } from './components/LeftSidebar';
import { MoreInfo } from './components/MoreInfo';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50">
      <Header />

      {/* Mobile-only Banner */}
      <div className="hidden md:hidden bg-white p-2 border-b">
        <a href="#">
            <img 
                src="https://dietacademy.jp/img2023/common/header/head-banner-mob-subscription.png" 
                alt="ダイエットに特化した資格講座" 
                className="w-full h-auto"
            />
        </a>
      </div>

      <div className="flex-grow w-full max-w-7xl mx-auto flex flex-col md:flex-row px-4 pb-16">
        <LeftSidebar />
        <main className="w-full md:flex-1 py-8">
          <DietCalculator />
          <div className="my-12 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-center mb-4 text-slate-700">ダイエットプランの結果はいかがでしたか？</h2>
            <div className="text-sm text-slate-600 space-y-4 text-center max-w-3xl mx-auto">
              <p>
                <strong className="text-blue-600">BMI値（Body Mass Index）とは、</strong>
                世界で最も広く使われている肥満判定用の体格指数です。
              </p>
              <p className="font-semibold bg-slate-100 p-2 rounded-md">
                BMI＝体重(kg) ÷ 身長(m) ÷ 身長(m)
              </p>
              <p>
                BMI値は、身長が同じでも体格（肩幅や筋肉量など）によって変わるため、あなたの体型を客観的に知るための重要な指標となります。
              </p>
            </div>
          </div>
          <MoreInfo />
          <FAQ />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;