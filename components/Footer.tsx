import React from 'react';

export const Footer: React.FC = () => {
  const footerLinks = [
    { href: "https://dietacademy.jp/info/2.html", text: "概要" },
    { href: "https://dietacademy.jp/info/3.html", text: "プライバシーポリシー" },
    { href: "https://dietacademy.jp/info/6.html", text: "サイト利用規約" },
    { href: "https://dietacademy.jp/info/7.html", text: "特定商取引法に基づく表示" },
    { href: "https://dietacademy.jp/info/4.html", text: "サイトマップ" },
  ];

  return (
    <footer className="bg-gradient-to-r from-rose-200 to-pink-300 text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.15)' }}>
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Footer Links Section */}
        <div className="py-8">
            <ul className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-10 gap-y-4">
                {footerLinks.map(link => (
                    <li key={link.text}>
                        <a 
                          href={link.href} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-base font-semibold hover:underline transition-all duration-300"
                        >
                          {link.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
      
        {/* Copyright Section */}
        <div className="py-5 border-t border-white/30 text-center text-sm font-bold space-y-2">
          <p>Copyright© 日本ダイエットアカデミー協会</p>
          <p>運営：一般社団法人国家資格対策センター</p>
          <p>&copy; KSTC All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};