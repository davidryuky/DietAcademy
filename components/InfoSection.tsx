import React from 'react';

export const Hero: React.FC = () => {
    const scrollToFaq = () => {
        const faqElement = document.getElementById('faq');
        if (faqElement) {
            faqElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section
            className="relative text-white py-20 md:py-32 flex items-center justify-center text-center overflow-hidden"
        >
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1597586740170-c0f8e9af6175?q=80&w=2670&auto-format&fit=crop" 
                    alt="" 
                    className="w-full h-full object-cover"
                />
                <div 
                    className="absolute inset-0 bg-gradient-to-br from-rose-300/40 via-fuchsia-400/30 to-pink-400/40 backdrop-blur-sm"
                ></div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <div className="animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.6)' }}>
                        知識で、変わる。<br className="sm:hidden" />一生モノのダイエット理論をあなたに。
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto font-semibold" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)' }}>
                        もうリバウンドに悩まない。科学的根拠に基づいた指導で、健康的な美しさを手に入れ、自信に満ちた毎日を。
                    </p>
                    <div className="mt-10">
                        <button
                            onClick={scrollToFaq}
                            className="inline-flex items-center justify-center px-8 py-4 bg-white/30 backdrop-blur-md border-2 border-white/40 text-white font-bold text-lg rounded-full shadow-xl hover:bg-white/40 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50"
                        >
                            <i className="fas fa-circle-info mr-3"></i>
                            <span>詳しく見る</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};