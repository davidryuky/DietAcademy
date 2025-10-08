import React, { useState, useEffect, useCallback } from 'react';

const NavLinks: React.FC<{ className?: string, onItemClick?: () => void }> = ({ className, onItemClick }) => (
    <ul className={className}>
        <li><a href="#/" className="py-2 px-3 block transition-all duration-300 hover:text-blue-400 hover:bg-slate-700 rounded-md" onClick={onItemClick}>Home</a></li>
        <li><a href="#/test" className="py-2 px-3 block transition-all duration-300 hover:text-blue-400 hover:bg-slate-700 rounded-md" onClick={onItemClick}>Test</a></li>
        <li><a href="#" className="py-2 px-3 block transition-all duration-300 hover:text-blue-400 hover:bg-slate-700 rounded-md" onClick={onItemClick}>コース案内​</a></li>
        <li><a href="#" className="py-2 px-3 block transition-all duration-300 hover:text-blue-400 hover:bg-slate-700 rounded-md" onClick={onItemClick}>メリット・活用法​</a></li>
        <li><a href="#" className="py-2 px-3 block transition-all duration-300 hover:text-blue-400 hover:bg-slate-700 rounded-md" onClick={onItemClick}>受講生の声</a></li>
        <li><a href="#" className="py-2 px-3 block transition-all duration-300 hover:text-blue-400 hover:bg-slate-700 rounded-md" onClick={onItemClick}>よくある質問</a></li>
        <li><a href="#" className="py-2 px-3 block transition-all duration-300 hover:text-blue-400 hover:bg-slate-700 rounded-md" onClick={onItemClick}>コラム</a></li>
    </ul>
);

const DesktopActionButton: React.FC<{ href: string; icon: string; text: string; className?: string }> = ({ href, icon, text, className }) => (
    <a
        href={href}
        className={`flex items-center justify-center px-5 py-2.5 text-base font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 ${className}`}
    >
        <i className={`fas ${icon} mr-2.5`}></i>
        <span>{text}</span>
    </a>
);

const MobileHeaderButton: React.FC<{ href: string; icon?: string; text: string; className?: string; }> = ({ href, icon, text, className }) => (
    <a href={href} className={`flex-1 flex flex-col items-center justify-center text-white p-2 rounded-md shadow-sm text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${className}`}>
       {icon && <i className={`fas ${icon} text-lg mb-1`}></i>}
       <span className="text-[10px] font-bold leading-tight tracking-tight uppercase">{text}</span>
    </a>
);


export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const controlHeader = useCallback(() => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY && window.scrollY > 100) { // if scroll down hide the header
                setVisible(false);
            } else { // if scroll up show the header
                setVisible(true);
            }
            setLastScrollY(window.scrollY);
        }
    }, [lastScrollY]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlHeader);
            return () => {
                window.removeEventListener('scroll', controlHeader);
            };
        }
    }, [controlHeader]);


    const DrawerMenu: React.FC = () => (
        <div className="p-4 overflow-y-auto h-full">
            <h3 className="text-lg font-bold mb-4 border-b pb-2 text-slate-700">メニュー</h3>
            <ul className="space-y-1 text-sm text-slate-600">
                <li className="font-bold text-base"><a href="#" onClick={toggleMenu} className="block py-2 hover:text-blue-500">コース案内</a></li>
                <li className="font-bold text-base"><a href="#" onClick={toggleMenu} className="block py-2 hover:text-blue-500">メリット・活用法</a></li>
                <li className="border-t pt-2 mt-2"><a href="#" onClick={toggleMenu} className="block py-1 hover:text-blue-500">いまなぜダイエットマスター資格なのか？</a></li>
                <li><a href="#" onClick={toggleMenu} className="block py-1 hover:text-blue-500">肥満予備軍(pre-obese)について</a></li>
                <li><a href="#" onClick={toggleMenu} className="block py-1 hover:text-blue-500">ダイエットを始める前に（動画）</a></li>
                <li><a href="#" onClick={toggleMenu} className="block py-1 hover:text-blue-500">BMIについて</a></li>
                <li><a href="#" onClick={toggleMenu} className="block py-1 hover:text-blue-500">人が痩せる仕組み</a></li>
                <li><a href="#" onClick={toggleMenu} className="block py-1 hover:text-blue-500">よくあるご質問</a></li>
                <li><a href="#" onClick={toggleMenu} className="block py-1 hover:text-blue-500">受講生の声</a></li>
                <li><a href="#" onClick={toggleMenu} className="block py-1 hover:text-blue-500">コラム</a></li>
                <li className="border-t pt-2 mt-2"><a href="#" onClick={toggleMenu} className="block py-1 hover:text-blue-500">YouTubeチャンネル</a></li>
                <li className="pt-4"><img src="https://dietacademy.jp/img2023/common/left-menu/tel.gif" alt="電話番号" /></li>
            </ul>
        </div>
    );

    return (
        <header className={`bg-white sticky top-0 z-50 shadow-sm transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
            {/* Desktop Header */}
            <div className="hidden md:block border-b">
                <div className="w-full max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <a href="#/" className="flex-shrink-0">
                                <img src="https://dietacademy.jp/img2023/common/header/logo.png" alt="ダイエットマスター" />
                            </a>
                             <a href="#" className="ml-5 transition-opacity hover:opacity-80">
                                <img alt="ダイエットに特化した資格講座" src="https://dietacademy.jp/img2023/common/header/head-banner-mob-subscription.png" />
                             </a>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                           <DesktopActionButton href="#" icon="fa-pen-to-square" text="講座申込" className="bg-orange-500 hover:bg-orange-600 text-white" />
                           <DesktopActionButton href="#" icon="fa-right-to-bracket" text="会員ログイン" className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-300" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Navigation Bar */}
            <nav className="hidden md:block bg-slate-800 text-white font-medium">
                <NavLinks className="w-full max-w-7xl mx-auto flex justify-center space-x-6 py-1" />
            </nav>


            {/* Mobile Header */}
            <div className="md:hidden w-full bg-white border-t-4 border-pink-500 shadow-md">
                 <div className="flex items-center justify-between px-2 py-2 space-x-2 border-b-2 border-sky-300">
                    <button onClick={toggleMenu} className="flex flex-col items-center justify-center w-16 text-slate-700 flex-shrink-0">
                        <i className="fas fa-bars text-3xl"></i>
                        <span className="text-xs font-bold text-pink-500">MENU</span>
                    </button>
                    
                    <div className="flex-shrink-0">
                         <img src="https://dietacademy.jp/img2023/common/header/head-banner-mob-subscription.png" alt="2004年創業" className="h-10"/>
                    </div>

                    <div className="flex-grow flex items-stretch space-x-1.5">
                        <MobileHeaderButton href="#" text="コース案内" className="bg-pink-600 hover:bg-pink-700" />
                        <MobileHeaderButton href="#" text="活用法" className="bg-blue-600 hover:bg-blue-700" />
                        <MobileHeaderButton href="#" icon="fa-file-signature" text="資料請求" className="bg-orange-600 hover:bg-orange-700" />
                        <MobileHeaderButton href="#" icon="fa-right-to-bracket" text="ログイン" className="bg-slate-700 hover:bg-slate-800" />
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div className="md:hidden">
                 {isMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>
                 )}
                <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                   <DrawerMenu />
                </div>
            </div>
        </header>
    );
};