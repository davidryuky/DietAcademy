import React from 'react';
import { InfoSection } from './InfoSection';
import { DietCalculator } from './DietCalculator';
import { MoreInfo } from './MoreInfo';
import { FAQ } from './FAQ';
import { AnimatedSection } from './AnimatedSection';
import { PageContentLayout } from './PageContentLayout';


const FeatureCard: React.FC<{
  title: string;
  icon: string;
  iconColorClass: string;
  borderColorClass: string;
  children: React.ReactNode;
}> = ({ title, icon, iconColorClass, borderColorClass, children }) => (
    <div className={`flex-1 bg-white p-6 rounded-lg shadow-md border-t-4 ${borderColorClass} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-start space-x-5`}>
        <div className="flex-shrink-0 mt-1">
            <i className={`fas ${icon} text-4xl ${iconColorClass}`}></i>
        </div>
        <div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
            <div className="text-slate-700 font-medium space-y-2">
                {children}
            </div>
        </div>
    </div>
);


const InfoButton: React.FC<{
  href: string;
  title: React.ReactNode;
  icon: string;
  gradientClass: string;
}> = ({ href, title, icon, gradientClass }) => (
  <a
    href={href}
    className={`relative flex-1 block group rounded-xl shadow-lg text-white text-center transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-1.5 ${gradientClass} overflow-hidden`}
  >
    <div className="p-8 flex flex-col items-center justify-center h-full">
      <div className="mb-5">
         <i className={`fas ${icon} text-5xl opacity-90 group-hover:opacity-100 transition-opacity`}></i>
      </div>
      <h3 className="text-2xl font-bold leading-tight" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.25)' }}>
        {title}
      </h3>
    </div>
    
    {/* Clickable Action Indicator */}
    <div className="absolute bottom-5 right-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 ease-in-out">
      <i className="fas fa-circle-chevron-right text-3xl"></i>
    </div>
  </a>
);


export const HomePage: React.FC = () => {
    return (
        <>
            <InfoSection />

            {/* Mobile-only Banner - Hidden as it is redundant with the header component */}
            <div className="hidden">
                <a href="#">
                    <img 
                        src="https://dietacademy.jp/img2023/common/header/head-banner-mob-subscription.png" 
                        alt="ダイエットに特化した資格講座" 
                        className="w-full h-auto"
                    />
                </a>
            </div>

            <PageContentLayout>
                <AnimatedSection>
                    <DietCalculator />
                </AnimatedSection>
                <AnimatedSection className="my-12">
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-rose-400 to-pink-400 text-white p-4 flex items-center justify-center text-center shadow-md">
                            <i className="fas fa-clipboard-check text-3xl mr-4 hidden sm:block"></i>
                            <h2 className="text-2xl md:text-3xl font-bold">ダイエットプランの結果はいかがでしたか？</h2>
                        </div>
                        <div className="p-4 md:p-5">
                            <div className="text-base text-slate-700 space-y-4 max-w-4xl mx-auto">
                                {/* BMI Explanation */}
                                <div className="p-3 bg-slate-50 border-l-4 border-rose-300 rounded-r-md">
                                    <p className="font-semibold">
                                        BMI値とは（Body Mass Index）の略で、世界で最も広く使われている肥満判定用の体格指数です。
                                    </p>
                                    <p className="mt-2 text-center text-lg font-mono bg-slate-200/70 py-1.5 px-3 rounded-md tracking-wide">
                                        BMI = 体重(kg) ÷ 身長(m) ÷ 身長(m)
                                    </p>
                                </div>
                                
                                {/* Unified Information Block */}
                                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm md:text-base space-y-4">
                                    <p>
                                        <strong>BMI値は例え身長が同じでも体格（肩幅やお腹回り、腰回りなど）により体重が変わって来るようにBMI値も大きく変わってきます。</strong>
                                    </p>
                                    <div className="space-y-3">
                                        <p className="flex items-start">
                                            <i className="fas fa-info-circle text-rose-400 mt-1 mr-2.5 flex-shrink-0"></i>
                                            <span>
                                                <span className="font-semibold">基礎代謝量</span>は、<a href="https://dietacademy.jp/calculate/harris.html" target="_blank" rel="noopener noreferrer" className="font-bold text-rose-500 hover:underline transition-colors">ハリス・ベネデクト方程式</a>を元に性別、年齢、身長、体重から計算しています。
                                            </span>
                                        </p>
                                        <p className="flex items-start">
                                            <i className="fas fa-info-circle text-rose-400 mt-1 mr-2.5 flex-shrink-0"></i>
                                            <span>
                                                <span className="font-semibold">運動消費エネルギー</span>は、厚生労働省の定める<a href="https://dietacademy.jp/calculate/mets.html" target="_blank" rel="noopener noreferrer" className="font-bold text-rose-500 hover:underline transition-colors">Mets数値</a>（運動の種類によって数値は変わります）により計算しています。
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
                
                <AnimatedSection>
                    <MoreInfo />
                </AnimatedSection>

                 <AnimatedSection className="my-8">
                    <FAQ />
                </AnimatedSection>
                
                <AnimatedSection className="space-y-12">
                     <div className="text-center space-y-4">
                        <a href="#" className="inline-block transition-transform duration-300 hover:scale-105"><img src="https://dietacademy.jp/img2023/toppage/btn-faq-wide.jpg" alt="ダイエットマスターよくある質問ボタン" className="mx-auto hidden md:block max-w-full h-auto"/></a> 
                        <a href="#" className="inline-block transition-transform duration-300 hover:scale-105"><img src="https://dietacademy.jp/img2023/toppage/btn-voices-wide.jpg" alt="受講生の喜びの声" className="mx-auto hidden md:block max-w-full h-auto"/></a>
                        
                        <a href="#" className="inline-block transition-opacity hover:opacity-80"><img src="https://dietacademy.jp/img2023/toppage/btn-faq.jpg" alt="ダイエットマスターよくある質問" className="mx-auto md:hidden max-w-full h-auto"/></a> 
                        <a href="#" className="inline-block transition-opacity hover:opacity-80"><img src="https://dietacademy.jp/img2023/toppage/btn-voices.jpg" alt="受講生の体験談" className="mx-auto md:hidden max-w-full h-auto"/></a>
                    </div>

                    {/* Feature Cards Section */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <FeatureCard 
                            title="受講及びダイエット期間" 
                            icon="fa-calendar-check" 
                            iconColorClass="text-rose-400" 
                            borderColorClass="border-rose-400"
                        >
                            <p>平均 半月〜3ヶ月で学んで痩せることができます。</p>
                            <p className="text-xs text-slate-500">
                                新陳代謝がひとまわりする期間を想定しています
                            </p>
                        </FeatureCard>
                        <FeatureCard 
                            title="受講及びダイエット方法" 
                            icon="fa-mobile-screen-button" 
                            iconColorClass="text-pink-400"
                            borderColorClass="border-pink-400"
                        >
                            <p>スマホやタブレットでいつでもどこでも動画中心で学習できます！</p>
                            <p className="text-xs text-slate-500">
                                イラストを多用した分かりやすい内容です。
                            </p>
                        </FeatureCard>
                    </div>

                    {/* Bottom Buttons */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <InfoButton
                            href="#"
                            title="ダイエットマスターの活躍"
                            icon="fa-award"
                            gradientClass="bg-gradient-to-br from-violet-300 to-fuchsia-400"
                        />
                        <InfoButton
                            href="#"
                            title={<>ダイエットマスターの理論は<br />こんな方に効果的です</>}
                            icon="fa-bullseye"
                            gradientClass="bg-gradient-to-br from-rose-300 to-pink-400"
                        />
                    </div>
                </AnimatedSection>
            </PageContentLayout>
        </>
    );
};