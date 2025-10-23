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
        className="group flex justify-between items-center w-full p-3 bg-white rounded-lg border border-slate-200 shadow-sm text-sm font-semibold text-slate-700 transition-all duration-300 hover:shadow-md hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:-translate-y-0.5 transform"
    >
        <span>{text}</span>
        <i className="fas fa-chevron-right text-slate-400 group-hover:text-blue-500 transition-colors duration-300 ml-2"></i>
    </a>
);

export const LeftSidebar: React.FC = () => {
    return (
        <aside className="hidden md:block w-64 flex-shrink-0 pr-8 pt-8">
            <div className="space-y-3 sticky top-24">
                {sidebarLinks.map((link, index) => (
                    <SidebarLink key={index} href={link.href} text={link.text} />
                ))}
                 <a 
                    href="tel:0120945528" 
                    className="block mt-6 p-4 bg-slate-800 text-white rounded-lg text-center shadow-lg transition-all duration-300 hover:bg-slate-700 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:ring-blue-500"
                 >
                     <i className="fas fa-phone-alt mb-2 text-2xl text-blue-300 animate-[pulse-glow_3s_ease-in-out_infinite]"></i>
                     <p className="text-xs text-slate-300 mb-1">お気軽にお問い合わせください</p>
                     <p className="font-bold text-2xl tracking-wider">0120-945-528</p>
                     <p className="text-xs text-slate-300 mt-1">受付時間 10:00 ~ 18:00</p>
                 </a>
            </div>
        </aside>
    );
};