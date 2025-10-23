import React from 'react';
import { Hero } from './InfoSection';
import { DietCalculator } from './DietCalculator';
import { MoreInfo } from './MoreInfo';
import { FAQ } from './FAQ';
import { AnimatedSection } from './AnimatedSection';
import { PageContentLayout } from './PageContentLayout';

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
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 flex items-center justify-center text-center shadow-md">
                            <i className="fas fa-clipboard-check text-3xl mr-4 hidden sm:block"></i>
                            <h2 className="text-2xl md:text-3xl font-bold">ダイエットプランの結果はいかがでしたか？</h2>
                        </div>
                        <div className="p-4 md:p-5">
                            <div className="text-base text-slate-700 space-y-2 max-w-4xl mx-auto">
                                {/* BMI Explanation */}
                                <div className="p-3 bg-slate-50 border-l-4 border-blue-400 rounded-r-md">
                                    <p className="font-semibold">
                                        BMI値とは（Body Mass Index）の略で、世界で最も広く使われている肥満判定用の体格指数です。
                                    </p>
                                    <p className="mt-2 text-center text-lg font-mono bg-slate-200/70 py-1.5 px-3 rounded-md tracking-wide">
                                        BMI = 体重(kg) ÷ 身長(m) ÷ 身長(m)
                                    </p>
                                </div>
                                
                                <p className="text-center md:text-left pt-1">
                                    <strong>BMI値は例え身長が同じでも体格（肩幅やお腹回り、腰回りなど）により体重が変わって来るようにBMI値も大きく変わってきます。</strong>
                                </p>
                                
                                {/* Points with Links */}
                                <div className="space-y-2 pt-1">
                                    <p className="p-2 bg-green-50 rounded-md border border-green-200">
                                       <strong className="text-green-800">※基礎代謝量</strong>は、<a href="https://dietacademy.jp/calculate/harris.html" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline transition-colors">ハリス・ベネディクト方程式</a>を元に性別、年齢、身長、体重から計算しています。
                                    </p>
                                    <p className="p-2 bg-orange-50 rounded-md border border-orange-200">
                                        <strong className="text-orange-800">※運動消費エネルギー</strong>は、厚生労働省の定める<a href="https://dietacademy.jp/calculate/mets.html" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline transition-colors">Mets数値</a>（運動の種類によって数値は変わります）により計算しています。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
                <AnimatedSection>
                    <MoreInfo />
                </AnimatedSection>
                <AnimatedSection className="my-16">
                    <FAQ />
                </AnimatedSection>
            </PageContentLayout>
        </>
    );
};