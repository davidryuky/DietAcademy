import React from 'react';

const ThreeColumnItem: React.FC<{ title: string; children: React.ReactNode; className: string; }> = ({ title, children, className }) => (
    <div className="flex-1 border rounded-lg overflow-hidden shadow-sm bg-white flex flex-col">
        <dl className="flex flex-col h-full">
            <dt className={`p-4 text-white font-bold text-center text-lg ${className}`}>
               {title}
            </dt>
            <dd className="p-4 text-sm text-center text-slate-600 flex-grow flex flex-col justify-center">
                <div>{children}</div>
            </dd>
        </dl>
    </div>
);

export const MoreInfo: React.FC = () => {
    return (
        <div className="space-y-12">
            {/* Banner Section */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-blue-800 mb-6">ダイエットマスター<br className="sm:hidden" />資格取得</h2>
                <div className="max-w-xs mx-auto p-4 border rounded-lg shadow-lg bg-white group">
                    <a href="#" className="overflow-hidden block rounded-md">
                        <img src="https://dietacademy.jp/img2023/toppage/banner-img6.jpg" alt="痩せる・太るには理由" className="w-full transition-transform duration-300 group-hover:scale-105"/>
                    </a>
                    <p className="text-sm mt-3 text-slate-600">痩せる・太るには理由がありますが</p>
                    <h3 className="font-bold my-2 text-slate-800">人間が痩せるには、基本的に<br />二つの理由しかありません</h3>
                    <a href="#" className="text-blue-600 hover:underline font-semibold text-sm">詳しく見る &raquo;</a>
                </div>
            </div>
            
             <div className="text-center space-y-4">
                <a href="#" className="inline-block transition-transform duration-300 hover:scale-105"><img src="https://dietacademy.jp/img2023/toppage/btn-faq-wide.jpg" alt="ダイエットマスターよくある質問ボタン" className="mx-auto hidden md:block max-w-full h-auto"/></a> 
                <a href="#" className="inline-block transition-transform duration-300 hover:scale-105"><img src="https://dietacademy.jp/img2023/toppage/btn-voices-wide.jpg" alt="受講生の喜びの声" className="mx-auto hidden md:block max-w-full h-auto"/></a>
                
                <a href="#" className="inline-block transition-opacity hover:opacity-80"><img src="https://dietacademy.jp/img2023/toppage/btn-faq.jpg" alt="ダイエットマスターよくある質問" className="mx-auto md:hidden max-w-full h-auto"/></a> 
                <a href="#" className="inline-block transition-opacity hover:opacity-80"><img src="https://dietacademy.jp/img2023/toppage/btn-voices.jpg" alt="受講生の体験談" className="mx-auto md:hidden max-w-full h-auto"/></a>
            </div>

            {/* Three Column Section */}
            <div className="flex flex-col md:flex-row gap-6">
                <ThreeColumnItem title="受講及びダイエット期間" className="bg-orange-500">
                    平均 半月〜3ヶ月で学んで痩せることができます。
                    <br />
                    <span className="text-xs block mt-1 text-slate-500">新陳代謝がひとまわりする期間を想定しています</span>
                </ThreeColumnItem>
                <ThreeColumnItem title="受講及びダイエット方法" className="bg-cyan-500">
                    スマホやタブレットでいつでもどこでも動画中心で学習できます！
                    <br />
                    <span className="text-xs block mt-1 text-slate-500">イラストを多用した分かりやすい内容です。</span>
                </ThreeColumnItem>
            </div>

            {/* Bottom Buttons */}
            <div className="flex flex-col md:flex-row gap-6">
                <a href="#" className="flex-1 block group">
                    <img src="https://dietacademy.jp/img2023/toppage/btn-katsuyaku.jpg" alt="ダイエットマスターの活躍" className="w-full rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:brightness-105" />
                </a>
                <a href="#" className="flex-1 block group">
                    <img src="https://dietacademy.jp/img2023/toppage/btn-effect.jpg" alt="ダイエットマスターはこんな方に効果的です" className="w-full rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:brightness-105" />
                </a>
            </div>
        </div>
    );
};