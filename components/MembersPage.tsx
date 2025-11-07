import React from 'react';
import { PageContentLayout } from './PageContentLayout';
import { AnimatedSection } from './AnimatedSection';

const SectionHeader: React.FC<{ title: string; icon: string; gradient: string }> = ({ title, icon, gradient }) => (
    <div className={`text-white p-4 flex items-center justify-center text-center shadow-md rounded-t-lg ${gradient}`}>
        <i className={`fas ${icon} text-3xl mr-4 hidden sm:block`}></i>
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
    </div>
);

const ContentCard: React.FC<{ title: string; href: string; imgSrc: string; description: string }> = ({ title, href, imgSrc, description }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 transform">
        <div className="overflow-hidden aspect-[16/10]">
            <img src={imgSrc} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="p-4">
            <h3 className="font-bold text-slate-800 text-md group-hover:text-rose-500 transition-colors">{title}</h3>
            <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>
    </a>
);

// New component for the support section, with content left and image right.
const SupportInfoBox: React.FC<{
  title: string;
  href: string;
  imgSrc: string;
  description: string;
}> = ({ title, href, imgSrc, description }) => (
  <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden group flex flex-col md:flex-row md:items-center transition-shadow duration-300 hover:shadow-xl min-h-0">
    {/* Content on the left */}
    <div className="p-6 md:p-8 flex flex-col justify-center md:w-2/5 lg:w-[30%]">
      <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300">{title}</h3>
      <p className="text-slate-600 mb-6 flex-grow">{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex self-start items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-base rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
      >
        詳しくはこちらから <i className="fas fa-arrow-right ml-2 text-xs"></i>
      </a>
    </div>
    {/* Image on the right */}
    <div className="md:w-3/5 lg:w-[70%]">
      <a href={href} target="_blank" rel="noopener noreferrer" className="block overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </a>
    </div>
  </div>
);


export const MembersPage: React.FC = () => {
    return (
        <PageContentLayout>
            <div className="space-y-12">
                <AnimatedSection>
                    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-lg shadow-lg p-8 text-center">
                        <h1 className="text-4xl font-extrabold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>ようこそ、ダイエットマスターへ！</h1>
                        <p className="mt-2 text-lg opacity-90 max-w-2xl mx-auto">あなたの健康的な未来を創るためのリソースがここにあります。さあ、学習を始めましょう。</p>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                        <SectionHeader title="オンライン学習コンテンツ" icon="fa-book-open-reader" gradient="bg-gradient-to-r from-rose-400 to-pink-400" />
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <ContentCard title="基礎編 動画講義" description="ダイエットの基本を動画で学ぶ" href="https://dietacademy.jp/members/movies-regular/" imgSrc="https://dietacademy.jp/members/img/top/thum-mov-reglar.jpg" />
                            <ContentCard title="上級編 動画講義" description="より専門的な知識を深める" href="https://dietacademy.jp/members/movies-senior/" imgSrc="https://dietacademy.jp/members/img/top/thum-mov-senior.jpg" />
                            <ContentCard title="基礎編 教本" description="講義内容をテキストで復習" href="https://dietacademy.jp/members/kyouhon-regular/" imgSrc="https://dietacademy.jp/members/img/top/thum-kyouhon-reglar.jpg" />
                            <ContentCard title="上級編 教本" description="詳細な解説付きのオンライン教本" href="https://dietacademy.jp/members/kyouhon-senior/" imgSrc="https://dietacademy.jp/members/img/top/thum-kyouhon-senior.jpg" />
                            <ContentCard title="レシピ集" description="低カロリーメニュー300種" href="https://dietacademy.jp/members/recipe/recipe.html" imgSrc="https://dietacademy.jp/members/img/top/thum-recipe.jpg" />
                            <ContentCard title="用語集" description="知っておくべき専門用語" href="https://dietacademy.jp/members/words/" imgSrc="https://dietacademy.jp/members/img/top/thum-words.jpg" />
                        </div>
                    </div>
                </AnimatedSection>
                
                 <AnimatedSection>
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                        <SectionHeader title="復習問題" icon="fa-graduation-cap" gradient="bg-gradient-to-r from-violet-400 to-fuchsia-400" />
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <ContentCard title="基礎編 復習問題" description="各章ごとの問題で理解度を高める" href="https://dietacademy.jp/members/questions/regular/" imgSrc="https://dietacademy.jp/members/questions/img/regular.jpg" />
                            <ContentCard title="上級編 復習問題" description="応用力を試すチャレンジ問題" href="https://dietacademy.jp/members/questions/senior/" imgSrc="https://dietacademy.jp/members/questions/img/senior.jpg" />
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                     <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                        <SectionHeader title="サポート & 資格取得" icon="fa-hands-helping" gradient="bg-gradient-to-r from-emerald-400 to-teal-500" />
                        <div className="p-4 space-y-6">
                            <SupportInfoBox
                                title="ダイエット診断" 
                                href="https://dietacademy.jp/members-diet-shindan/" 
                                imgSrc="https://dietacademy.jp/members/img/top/shindan-img.jpg"
                                description="あなたの現状を分析し、最適なダイエットプランへの第一歩を踏み出しましょう。" 
                            />
                            <SupportInfoBox
                                title="ダイエットサポート" 
                                href="https://dietacademy.jp/members/support/" 
                                imgSrc="https://dietacademy.jp/members/support/img/support-img.jpg"
                                description="専門家があなたのダイエットを個別にサポート。疑問や不安を解消します。" 
                            />
                            <SupportInfoBox
                                title="資格取得" 
                                href="https://dietacademy.jp/members/shikaku/" 
                                imgSrc="https://dietacademy.jp/members/shikaku/img/shikaku-image.jpg"
                                description="ダイエットの知識を証明する資格を取得し、キャリアアップを目指しましょう。" 
                            />
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="px-4 py-6 bg-slate-100 border border-slate-200 rounded-lg">
                        <details className="group">
                            <summary className="flex justify-between items-center font-semibold cursor-pointer text-slate-700 hover:text-slate-900 list-none">
                                サブスク会員退会方法
                                <span className="transition-transform duration-300 group-open:rotate-180">
                                    <i className="fas fa-chevron-down"></i>
                                </span>
                            </summary>
                            <div className="mt-4 text-sm text-slate-600 space-y-2">
                                <p>ダイエットマスター公式サイト「サイトマップ」内の「ダイエットマスターサブスク会員退会」よりお手続きください。</p>
                                <p>※資格取得コース、ダイエットマスタープログラムコースお申込の会員様は「無料会員」となります。</p>
                            </div>
                        </details>
                    </div>
                </AnimatedSection>
            </div>
        </PageContentLayout>
    );
};