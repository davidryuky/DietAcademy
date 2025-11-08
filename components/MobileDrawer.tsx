import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const publicMenuItems = [
    { text: 'コース案内', href: 'https://dietacademy.jp/kouza/' },
    { text: 'メリット・活用法', href: 'https://dietacademy.jp/shikaku/' },
    { text: 'いまなぜダイエットマスター資格なのか？', href: 'https://dietacademy.jp/whynow/' },
    { text: '肥満予備軍(pre-obese)について', href: 'https://dietacademy.jp/preobese/' },
    { text: 'ダイエットを始める前に（動画）', href: 'https://dietacademy.jp/important-sample/' },
    { text: 'ダイエットマスター基礎編サンプル動画', href: 'https://dietacademy.jp/junior-sample/' },
    { text: 'ダイエットマスター上級編サンプル動画', href: 'https://dietacademy.jp/senior-sample/' },
    { text: 'BMIについて', href: 'https://dietacademy.jp/bmi/' },
    { text: '人が痩せる仕組み', href: 'https://dietacademy.jp/info/1.html' },
    { text: 'よくあるご質問', href: 'https://dietacademy.jp/faq/' },
    { text: '受講生の声', href: 'https://dietacademy.jp/voices/' },
    { text: 'コラム', href: 'https://dietacademy.jp/columns/' },
    { text: '学習内容とサンプル動画', href: 'https://dietacademy.jp/sample-movie/' },
    { text: 'ダイエット300食レシピ', href: 'https://dietacademy.jp/recipe-sample/' },
    { text: 'こんな方に効果的です', href: 'https://dietacademy.jp/effect/' },
    { text: 'ダイエットマスターの活躍', href: 'https://dietacademy.jp/activity/' },
    { text: 'YouTubeチャンネル', href: 'https://dietacademy.jp/youtube/' },
    { text: 'クイズで学ぶ基本常識', href: 'https://dietacademy.jp/diet-columns/' },
    { text: 'ご存知ですか？ダイエットの歴史', href: 'https://dietacademy.jp/history/' },
    { text: '映画「スーパーサイズミー」', href: 'https://dietacademy.jp/burger/' },
    { text: 'ダイエットマスター認定店', href: 'https://dietacademy.jp/official-shop/' },
    { text: '究極のダイエットは塀の中にあった！', href: 'https://dietacademy.jp/prison/' },
];

const memberMenuItems = [
    { text: 'ダイエット診断', href: 'https://dietacademy.jp/members-diet-shindan/' },
    { text: 'ダイエットサポート', href: 'https://dietacademy.jp/members/support/' },
    { text: '資格取得', href: 'https://dietacademy.jp/members/shikaku/' },
];

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    isAuthenticated: boolean;
    onLogout: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, isAuthenticated, onLogout }) => {
    const location = useLocation();
    const isMembersPage = location.pathname.startsWith('/members');

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
    
    const menuItems = isMembersPage ? memberMenuItems : publicMenuItems;

    return (
        <>
            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Drawer Panel */}
            <div 
                className={`fixed top-0 left-0 h-screen w-3/4 max-w-[300px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden border-r border-slate-200 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex-grow overflow-y-auto">
                    <nav>
                        <ul className="flex flex-col text-slate-700 divide-y divide-slate-200">
                            {/* Home Link */}
                            <li>
                                <Link to={isAuthenticated ? "/members" : "/"} onClick={onClose} className="flex items-center px-6 py-4 text-base font-bold bg-rose-50 text-rose-700 transition-colors hover:bg-rose-100">
                                    <i className="fas fa-home mr-4 w-5 text-center text-rose-600"></i>
                                    {isAuthenticated ? 'メンバーズホーム' : 'Home'}
                                </Link>
                            </li>
                            
                            {/* Dynamically generated menu items */}
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <a href={item.href} onClick={onClose} className="group flex items-center justify-between px-6 py-4 text-base font-semibold transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 hover:translate-x-1">
                                        <span>{item.text}</span>
                                        <i className="fas fa-chevron-right text-slate-400 group-hover:text-rose-500 transition-colors ml-2"></i>
                                    </a>
                                </li>
                            ))}
                            
                            {!isMembersPage && <li className="px-6 pt-6">
                               <a href="tel:0120945528">
                                  <img src="https://dietacademy.jp/img2023/common/left-menu/tel.gif" alt="電話番号: 0120945528" className="transition-opacity hover:opacity-80" />
                               </a>
                            </li>}
                        </ul>
                    </nav>
                </div>
                 {isAuthenticated && (
                    <div className="p-4 border-t border-slate-200">
                        <button 
                            onClick={() => { onLogout(); onClose(); }}
                            className="w-full flex items-center justify-center px-4 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <i className="fas fa-right-from-bracket mr-3"></i>
                            ログアウト
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};