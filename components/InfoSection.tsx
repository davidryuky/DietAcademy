import React from 'react';

export const Hero: React.FC = () => {
    const scrollToCalculator = () => {
        const calculatorElement = document.getElementById('calculator');
        if (calculatorElement) {
            calculatorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="relative bg-slate-800 text-white py-20 md:py-32 flex items-center justify-center text-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=2601&auto=format&fit=crop')" }}
            ></div>
            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <div className="animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        あなたのための<br className="sm:hidden" />理想のダイエットプランを発見
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-300 mb-8" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                        あなたの目標に合わせた、科学的根拠に基づく健康的な食事計画を数分で作成します。
                    </p>
                    <button
                        onClick={scrollToCalculator}
                        className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <i className="fas fa-calculator mr-2"></i>
                        無料プラン計算を始める
                    </button>
                </div>
            </div>
        </section>
    );
};
