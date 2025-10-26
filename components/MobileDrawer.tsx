import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const menuGroups = [
    {
        title: '講座について',
        icon: 'fa-book-open',
        items: [
            { text: 'コース案内', href: 'https://dietacademy.jp/kouza/' },
            { text: 'メリット・活用法', href: 'https://dietacademy.jp/shikaku/' },
            { text: '学習内容とサンプル動画', href: 'https://dietacademy.jp/sample-movie/' },
            { text: 'ダイエット300食レシピ', href: 'https://dietacademy.jp/recipe-sample/' },
        ],
    },
    {
        title: '知識を深める',
        icon: 'fa-brain',
        items: [
            { text: 'いまなぜダイエットマスター資格なのか？', href: 'https://dietacademy.jp/whynow/' },
            { text: '肥満予備軍(pre-obese)について', href: 'https://dietacademy.jp/preobese/' },
            { text: 'ダイエットを始める前に（動画）', href: 'https://dietacademy.jp/important-sample/' },
            { text: 'BMIについて', href: 'https://dietacademy.jp/bmi/' },
            { text: '人が痩せる仕組み', href: 'https://dietacademy.jp/info/1.html' },
            { text: 'YouTubeチャンネル', href: 'https://dietacademy.jp/youtube/' },
            { text: 'クイズで学ぶ基本常識', href: 'https://dietacademy.jp/diet-columns/' },
            { text: 'ご存知ですか？ダイエットの歴史', href: 'https://dietacademy.jp/history/' },
        ],
    },
    {
        title: 'サポート & その他',
        icon: 'fa-life-ring',
        items: [
            { text: 'よくあるご質問', href: 'https://dietacademy.jp/faq/' },
            { text: '受講生の声', href: 'https://dietacademy.jp/voices/' },
            { text: 'コラム', href: 'https://dietacademy.jp/columns/' },
            { text: 'こんな方に効果的です', href: 'https://dietacademy.jp/effect/' },
            { text: 'ダイエットマスターの活躍', href: 'https://dietacademy.jp/activity/' },
            { text: 'ダイエットマスター認定店', href: 'https://dietacademy.jp/official-shop/' },
        ],
    },
];

const AccordionItem: React.FC<{
    group: typeof menuGroups[0];
    isOpen: boolean;
    onToggle: () => void;
    onLinkClick: () => void;
}> = ({ group, isOpen, onToggle, onLinkClick }) => {
    return (
        <div className="border-b border-rose-100">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center text-left p-5 group focus:outline-none"
                aria-expanded={isOpen}
            >
                <div className="flex items-center">
                    <i className={`fas ${group.icon} w-6 text-center text-rose-500 text-lg mr-4`}></i>
                    <span className="text-base font-bold text-slate-800">{group.title}</span>
                </div>
                <i className={`fas fa-chevron-down text-slate-400 group-hover:text-rose-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
            </button>
            <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <ul className="pt-2 pb-4 pl-12 pr-4 divide-y divide-slate-100">
                        {group.items.map((item) => (
                            <li key={item.text}>
                                <a href={item.href} onClick={onLinkClick} className="block py-3 text-slate-600 font-semibold hover:text-rose-600 transition-colors">
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export const MobileDrawer: React.FC<{ isOpen: boolean; onClose: () => void; onLoginClick: () => void; }> = ({ isOpen, onClose, onLoginClick }) => {
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleToggleAccordion = (title: string) => {
        setOpenAccordion(openAccordion === title ? null : title);
    };
    
    const handleLoginClick = () => {
        onLoginClick();
        onClose();
    };

    return (
        <div 
            className={`fixed inset-0 bg-rose-50 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            role="dialog"
            aria-modal="true"
        >
           <div className="h-screen w-full overflow-y-auto pb-24">
               <div className="flex justify-between items-center p-4 sticky top-0 bg-rose-50/80 backdrop-blur-sm z-10 border-b border-rose-100">
                    <Link to="/" onClick={onClose}>
                        <img src="https://dietacademy.jp/img2023/common/header/logo.png" alt="ダイエットマスター" className="h-10" />
                    </Link>
                    {/* The close button is now the X in the header, managed by MainLayout/Header */}
               </div>

               <nav className="mt-4">
                   {menuGroups.map((group) => (
                       <AccordionItem 
                           key={group.title}
                           group={group}
                           isOpen={openAccordion === group.title}
                           onToggle={() => handleToggleAccordion(group.title)}
                           onLinkClick={onClose}
                       />
                   ))}
               </nav>

               <div className="p-6 space-y-4">
                    <a href="#" className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-white bg-gradient-to-r from-rose-400 to-pink-400">
                         <i className="fas fa-pen-to-square text-xl mr-3"></i>
                         <span>講座申込</span>
                    </a>
                    <button type="button" onClick={handleLoginClick} className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-300">
                         <i className="fas fa-right-to-bracket text-xl mr-3"></i>
                         <span>会員ログイン</span>
                    </button>
               </div>
               
               <div className="px-6 pt-4">
                   <a href="tel:0120945528" className="block transition-opacity hover:opacity-80">
                      <img src="https://dietacademy.jp/img2023/common/left-menu/tel.gif" alt="電話番号: 0120-945-528" />
                   </a>
                </div>

           </div>
        </div>
    );
};