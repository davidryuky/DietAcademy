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
                    <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
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