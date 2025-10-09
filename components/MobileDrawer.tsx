import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Centralize the links for the mobile drawer
const mobileMenuLinks = [
    { type: 'heading', text: 'メニュー' },
    { type: 'link', text: 'Home', href: '#/', isBold: true },
    { type: 'link', text: 'Test', href: '#/test', isBold: true },
    { type: 'link', text: 'コース案内', href: '#', isBold: true },
    { type: 'link', text: 'メリット・活用法', href: '#', isBold: true },
    { type: 'divider' },
    { type: 'link', text: 'いまなぜダイエットマスター資格なのか？', href: '#' },
    { type: 'link', text: '肥満予備軍(pre-obese)について', href: '#' },
    { type: 'link', text: 'ダイエットを始める前に（動画）', href: '#' },
    { type: 'link', text: 'BMIについて', href: '#' },
    { type: 'link', text: '人が痩せる仕組み', href: '#' },
    { type: 'link', text: 'よくあるご質問', href: '#' },
    { type: 'link', text: '受講生の声', href: '#' },
    { type: 'link', text: 'コラム', href: '#' },
    { type: 'divider' },
    { type: 'link', text: 'YouTubeチャンネル', href: '#' },
    { type: 'image', src: 'https://dietacademy.jp/img2023/common/left-menu/tel.gif', alt: '電話番号' }
];

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const renderLink = (link, key, onClose) => {
    const isRoutable = link.href.startsWith('#/');
    const toPath = link.href.substring(1); // remove '#'

    if (!isRoutable) {
        return (
            <li key={key} className={`${link.isBold ? 'font-bold text-base' : ''} transition-colors hover:text-blue-500`}>
                <a href={link.href} onClick={onClose} className="block py-2">
                    {link.text}
                </a>
            </li>
        );
    }

    return (
        <li key={key} className={`${link.isBold ? 'font-bold text-base' : ''} transition-colors hover:text-blue-500`}>
            <Link to={toPath} onClick={onClose} className="block py-2">
                {link.text}
            </Link>
        </li>
    );
}


export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
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

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden animate-fade-in" 
                    onClick={onClose}
                    aria-hidden="true"
                ></div>
            )}
            <div 
                className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-heading"
            >
                <div className="p-4 overflow-y-auto h-full">
                    <ul className="space-y-1 text-sm text-slate-600">
                        {mobileMenuLinks.map((item, index) => {
                            switch (item.type) {
                                case 'heading':
                                    return <h3 key={index} id="mobile-menu-heading" className="text-lg font-bold mb-4 border-b pb-2 text-slate-700">{item.text}</h3>;
                                case 'link':
                                    // @ts-ignore
                                    return renderLink(item, index, onClose);
                                case 'divider':
                                    return <li key={index} className="border-t my-2"></li>;
                                case 'image':
                                     // @ts-ignore
                                    return <li key={index} className="pt-4"><img src={item.src} alt={item.alt} /></li>;
                                default:
                                    return null;
                            }
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};