import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const NavLinks: React.FC<{ className?: string }> = ({ className }) => (
    <ul className={className}>
        <li><Link to="/" className="py-2 px-3 block transition-all duration-300 hover:bg-white/25 rounded-md">Home</Link></li>
        <li><Link to="/test" className="py-2 px-3 block transition-all duration-300 hover:bg-white/25 rounded-md">🤖 TEST</Link></li>
        <li><a href="#" className="py-2 px-3 block transition-all duration-300 hover:bg-white/25 rounded-md">コース案内</a></li>
        <li><a href="#" className="py-2 px-3 block transition-all duration-300 hover:bg-white/25 rounded-md">メリット・活用法</a></li>
        <li><a href="#" className="py-2 px-3 block transition-all duration-300 hover:bg-white/25 rounded-md">受講生の声</a></li>
        <li><a href="#" className="py-2 px-3 block transition-all duration-300 hover:bg-white/25 rounded-md">よくある質問</a></li>
        <li><a href="#" className="py-2 px-3 block transition-all duration-300 hover:bg-white/25 rounded-md">コラム</a></li>
    </ul>
);

const MemberNavLinks: React.FC<{ className?: string; onLogout: () => void }> = ({ className, onLogout }) => (
    <ul className={className}>
        <li><a href="#" className="py-2 px-3 block transition-all duration-300 hover:bg-white/25 rounded-md">ダイエット診断</a></li>
        <li><a href="#" className="py-2 px-3 block transition-all duration-300 hover:bg-white/25 rounded-md">ダイエットサポート</a></li>
        <li><a href="#" className="py-2 px-3 block transition-all duration-300 hover:bg-white/25 rounded-md">資格取得</a></li>
    </ul>
);

const DesktopActionButton: React.FC<{ href?: string; onClick?: () => void; icon: string; text: string; className?: string }> = ({ href, onClick, icon, text, className }) => {
    const commonProps = {
        className: `flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 ${className}`,
        onClick: onClick
    };

    if (href) {
        return (
            <a href={href} {...commonProps}>
                <i className={`fas ${icon} text-xl mr-3`}></i>
                <span>{text}</span>
            </a>
        );
    }

    return (
        <button type="button" {...commonProps}>
            <i className={`fas ${icon} text-xl mr-3`}></i>
            <span>{text}</span>
        </button>
    );
};


// Redesigned Mobile Action Button for a cleaner, modern look
interface MobileActionButtonProps {
    href?: string;
    onClick?: () => void;
    icon: string;
    text: string;
    colorClass: string;
}

const MobileActionButton: React.FC<MobileActionButtonProps> = ({ href, onClick, icon, text, colorClass }) => {
    const commonClasses = `w-full flex flex-col items-center justify-center p-3 text-center transition-colors duration-300 rounded-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-rose-400 ${colorClass}`;
    const content = (
        <>
            <i className={`fas ${icon} fa-fw text-2xl`}></i>
            <span className="text-xs font-semibold mt-1.5 tracking-tight">{text}</span>
        </>
    );

    if (href) {
        return (
            <a href={href} className={commonClasses}>
                {content}
            </a>
        );
    }
    
    return (
        <button type="button" onClick={onClick} className={commonClasses}>
            {content}
        </button>
    );
};


export const Header: React.FC<{ isMenuOpen: boolean, onMenuToggle: () => void, onLoginClick: () => void; isAuthenticated: boolean; onLogout: () => void; }> = ({ isMenuOpen, onMenuToggle, onLoginClick, isAuthenticated, onLogout }) => {
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
                             {!isAuthenticated && <a href="#" className="ml-5 transition-opacity hover:opacity-80">
                                <img alt="ダイエットに特化した資格講座" src="https://dietacademy.jp/img2023/common/header/head-banner-mob-subscription.png" />
                             </a>}
                        </div>
                        
                        {!isAuthenticated && (
                            <div className="flex items-center space-x-4">
                               <DesktopActionButton href="#" icon="fa-pen-to-square" text="講座申込" className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white" />
                               <DesktopActionButton onClick={onLoginClick} icon="fa-right-to-bracket" text="会員ログイン" className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-300" />
                            </div>
                        )}
                        {isAuthenticated && (
                            <div className="flex items-center space-x-4">
                                <DesktopActionButton 
                                    onClick={onLogout} 
                                    icon="fa-right-from-bracket" 
                                    text="ログアウト" 
                                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-200" 
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop Navigation Bar */}
            {!isAuthenticated ? (
                <nav className="hidden md:block bg-gradient-to-r from-rose-300 to-pink-400 text-white font-semibold shadow-md">
                    <NavLinks className="w-full max-w-7xl mx-auto flex justify-center space-x-6 py-1" />
                </nav>
            ) : (
                 <nav className="hidden md:block bg-gradient-to-r from-sky-300 to-blue-400 text-white font-semibold shadow-md">
                    <MemberNavLinks onLogout={onLogout} className="w-full max-w-7xl mx-auto flex justify-center space-x-6 py-1" />
                </nav>
            )}


            {/* Mobile Header - Redesigned for a cleaner and more professional look */}
            <div className="md:hidden w-full bg-white shadow-md">
                 {/* Top Bar: Logo & Menu Toggle */}
                 <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex-shrink-0">
                            <img src="https://dietacademy.jp/img2023/common/header/logo.png" alt="ダイエットマスター" className="h-16"/>
                        </Link>
                         {!isAuthenticated && (
                            <a href="#" className="transition-opacity hover:opacity-80">
                               <img src="https://dietacademy.jp/img2023/common/header/head-banner-mob-subscription.png" alt="ダイエットに特化した資格講座" className="h-16"/>
                            </a>
                        )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        {isAuthenticated && (
                            <button
                                onClick={onLogout}
                                className="flex items-center justify-center h-10 w-10 bg-rose-50 text-rose-700 rounded-full border border-rose-200 hover:bg-rose-100 active:bg-rose-200 transition-colors"
                                aria-label="ログアウト"
                            >
                                <i className="fas fa-right-from-bracket text-lg"></i>
                            </button>
                        )}
                        <button 
                            onClick={onMenuToggle} 
                            className="relative z-50 flex flex-col items-center justify-center w-10 h-10"
                            aria-label="メニューを開閉する"
                            aria-expanded={isMenuOpen}
                        >
                            <span className={`block w-6 h-0.5 bg-slate-800 rounded-full transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-slate-800 rounded-full mt-1.5 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-slate-800 rounded-full mt-1.5 transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
                        </button>
                    </div>
                </div>

                {/* Bottom Bar: Action Buttons */}
                {!isAuthenticated && (
                    <div className="grid grid-cols-4 border-t border-slate-200 bg-slate-50/50">
                        <MobileActionButton href="#" text="コース案内" icon="fa-book-open" colorClass="text-rose-400" />
                        <MobileActionButton href="#" text="活用法" icon="fa-lightbulb" colorClass="text-pink-400" />
                        <MobileActionButton href="#" text="資料請求" icon="fa-file-signature" colorClass="text-fuchsia-400" />
                        <MobileActionButton onClick={onLoginClick} text="ログイン" icon="fa-right-to-bracket" colorClass="text-slate-600" />
                    </div>
                )}
            </div>
        </header>
    );
};