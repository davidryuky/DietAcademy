import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const NavLinks: React.FC<{ className?: string, onItemClick?: () => void }> = ({ className, onItemClick }) => (
    <ul className={className}>
        <li><Link to="/" className="py-2 px-3 block transition-all duration-300 hover:text-blue-400 hover:bg-slate-700 rounded-md" onClick={onItemClick}>Home</Link></li>
        <li><Link to="/test" className="py-2 px-3 block transition-all duration-300 hover:text-blue-400 hover:bg-slate-700 rounded-md" onClick={onItemClick}>Test</Link></li>
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

// Redesigned Mobile Action Button for a cleaner, modern look
const MobileActionButton: React.FC<{ href: string; icon: string; text: string; colorClass: string; }> = ({ href, icon, text, colorClass }) => (
    <a href={href} className={`flex flex-col items-center justify-center p-3 text-center transition-colors duration-300 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none ${colorClass}`}>
       <i className={`fas ${icon} fa-fw text-2xl`}></i>
       <span className="text-xs font-semibold mt-1.5 tracking-tight">{text}</span>
    </a>
);


export const Header: React.FC<{ isMenuOpen: boolean, onMenuToggle: () => void }> = ({ isMenuOpen, onMenuToggle }) => {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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

    return (
        <header className={`bg-white sticky top-0 z-50 shadow-sm transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
            {/* Desktop Header */}
            <div className="hidden md:block border-b">
                <div className="w-full max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0">
                                <img src="https://dietacademy.jp/img2023/common/header/logo.png" alt="ダイエットマスター" />
                            </Link>
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


            {/* Mobile Header - Redesigned for a cleaner and more professional look */}
            <div className="md:hidden w-full bg-white shadow-md">
                 {/* Top Bar: Logo & Menu Toggle */}
                 <div className="flex items-center justify-between px-4 py-3">
                    <Link to="/" className="flex-shrink-0">
                        <img src="https://dietacademy.jp/img2023/common/header/logo.png" alt="ダイエットマスター" className="h-7"/>
                    </Link>
                    
                    <button 
                        onClick={onMenuToggle} 
                        className="relative z-20 flex flex-col items-center justify-center w-10 h-10"
                        aria-label="メニューを開閉する"
                        aria-expanded={isMenuOpen}
                    >
                        <span className={`block w-6 h-0.5 bg-slate-800 rounded-full transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-slate-800 rounded-full mt-1.5 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-slate-800 rounded-full mt-1.5 transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
                    </button>
                </div>

                {/* Bottom Bar: Action Buttons */}
                <div className="grid grid-cols-4 border-t border-slate-200 bg-slate-50/50">
                    <MobileActionButton href="#" text="コース案内" icon="fa-book-open" colorClass="text-sky-600" />
                    <MobileActionButton href="#" text="活用法" icon="fa-lightbulb" colorClass="text-teal-600" />
                    <MobileActionButton href="#" text="資料請求" icon="fa-file-signature" colorClass="text-orange-500" />
                    <MobileActionButton href="#" text="ログイン" icon="fa-right-to-bracket" colorClass="text-slate-600" />
                </div>
            </div>
        </header>
    );
};