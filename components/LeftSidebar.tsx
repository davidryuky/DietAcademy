import React from 'react';

const sidebarLinks = [
    { href: "#", text: "いまなぜダイエットマスター資格なのか" },
    { href: "#", text: "肥満予備軍(pre-obese)について" },
    { href: "#", text: "BMIについて" },
    { href: "#", text: "ダイエットを始める前に" },
    { href: "#", text: "ダイエットマスター上級編" },
    { href: "#", text: "YouTubeチャンネル" },
    { href: "#", text: "クイズで学ぶ" },
    { href: "#", text: "ダイエットの歴史" },
    { href: "#", text: "認定店" },
    { href: "#", text: "チーズバーガー法案" },
    { href: "#", text: "究極のダイエットは塀の中にあった" },
];

const SidebarLink: React.FC<{ href: string; text: string; }> = ({ href, text }) => (
    <a 
        href={href} 
        className="group flex justify-between items-center w-full p-3 bg-white rounded-lg border border-slate-200 shadow-sm text-sm font-semibold text-slate-700 transition-all duration-300 hover:shadow-md hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 hover:-translate-y-0.5 transform"
    >
        <span>{text}</span>
        <i className="fas fa-chevron-right text-slate-400 group-hover:text-rose-500 transition-colors duration-300 ml-2"></i>
    </a>
);

export const LeftSidebar: React.FC = () => {
    return (
        <aside className="hidden md:block w-64 flex-shrink-0 pr-8 pt-8">
            <div className="space-y-3 sticky top-8">
                {sidebarLinks.map((link, index) => (
                    <SidebarLink key={index} href={link.href} text={link.text} />
                ))}
                 <a 
                    href="tel:0120945528" 
                    className="block mt-6 px-2 py-4 bg-rose-50 border border-rose-200 rounded-xl shadow-md text-center transition-all duration-300 hover:shadow-lg hover:border-rose-300 hover:-translate-y-1"
                 >
                    <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-white rounded-full shadow">
                       <i className="fas fa-phone-volume text-xl text-rose-500"></i>
                    </div>
                    <p className="text-sm font-semibold text-slate-600">お気軽にお問い合わせください</p>
                    <p className="font-bold text-3xl text-slate-800 my-1 tracking-tight">0120-945-528</p>
                    <div className="text-xs text-rose-600 font-semibold bg-rose-100 inline-block px-2 py-1 rounded-full mt-1">
                        受付時間 10:00 ~ 18:00
                    </div>
                 </a>
            </div>
        </aside>
    );
};