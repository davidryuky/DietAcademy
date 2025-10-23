import React from 'react';
import { Hero } from './InfoSection';
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
  className: string;
  iconClassName: string;
}> = ({ href, title, className, iconClassName }) => (
  <a
    href={href}
    className={`flex-1 block group rounded-lg shadow-md text-white overflow-hidden transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1 ${className}`}
  >
    <div className="p-6 h-full flex justify-between items-center min-h-[100px]">
      <div className="flex-grow">
        <h3 className="text-2xl font-bold leading-tight">{title}</h3>
      </div>
      <div className="ml-4 flex-shrink-0">
        <i
          className={`fas fa-play-circle text-5xl opacity-80 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100 ${iconClassName}`}
        ></i>
      </div>
    </div>
  </a>
);


export const HomePage: React.FC = () => {
    return (
        <>
            <Hero />

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
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 flex items-center justify-center text-center shadow-md">
                            <i className="fas fa-clipboard-check text-3xl mr-4 hidden sm:block"></i>
                            <h2 className="text-2xl md:text-3xl font-bold">ダイエットプランの結果はいかがでしたか？</h2>
                        </div>
                        <div className="p-4 md:p-5">
                            <div className="text-base text-slate-700 space-y-4 max-w-4xl mx-auto">
                                {/* BMI Explanation */}
                                <div className="p-3 bg-slate-50 border-l-4 border-blue-400 rounded-r-md">
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
                                            <i className="fas fa-info-circle text-blue-500 mt-1 mr-2.5 flex-shrink-0"></i>
                                            <span>
                                                <span className="font-semibold">基礎代謝量</span>は、<a href="https://dietacademy.jp/calculate/harris.html" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline transition-colors">ハリス・ベネデクト方程式</a>を元に性別、年齢、身長、体重から計算しています。
                                            </span>
                                        </p>
                                        <p className="flex items-start">
                                            <i className="fas fa-info-circle text-blue-500 mt-1 mr-2.5 flex-shrink-0"></i>
                                            <span>
                                                <span className="font-semibold">運動消費エネルギー</span>は、厚生労働省の定める<a href="https://dietacademy.jp/calculate/mets.html" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline transition-colors">Mets数値</a>（運動の種類によって数値は変わります）により計算しています。
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
                            iconColorClass="text-orange-500" 
                            borderColorClass="border-orange-500"
                        >
                            <p>平均 半月〜3ヶ月で学んで痩せることができます。</p>
                            <p className="text-xs text-slate-500">
                                新陳代謝がひとまわりする期間を想定しています
                            </p>
                        </FeatureCard>
                        <FeatureCard 
                            title="受講及びダイエット方法" 
                            icon="fa-mobile-screen-button" 
                            iconColorClass="text-cyan-500"
                            borderColorClass="border-cyan-500"
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
                            className="bg-gradient-to-br from-sky-500 to-blue-600"
                            iconClassName="text-blue-200"
                        />
                        <InfoButton
                            href="#"
                            title={<>ダイエットマスターの理論は<br />こんな方に効果的です</>}
                            className="bg-gradient-to-br from-teal-500 to-cyan-600"
                            iconClassName="text-cyan-200"
                        />
                    </div>
                </AnimatedSection>
            </PageContentLayout>
        </>
    );
};