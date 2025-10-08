import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="w-full max-w-7xl mx-auto pt-16 pb-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <img src="https://dietacademy.jp/img2023/common/header/logo.png" alt="ダイエットマスター" className="h-8" />
            <p className="text-sm text-slate-400">
              元祖ダイエット機関として、誰もが納得できる正攻法なダイエットの知識と理論を学び、あなたの目標達成をサポートします。
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">クイックリンク</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors duration-300">コース案内</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">メリット・活用法</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">受講生の声</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">よくある質問</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">コラム</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">会社情報</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors duration-300">概要</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">プライバシーポリシー</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">サイト利用規約</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">特定商取引法に基づく表示</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">サイトマップ</a></li>
            </ul>
          </div>
          
          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">お問い合わせ</h4>
            <div className="space-y-4 text-sm">
                <div className="flex items-center">
                    <i className="fas fa-phone-alt mr-3 text-blue-400"></i>
                    <span>0120-945-528</span>
                </div>
                <div className="flex items-center">
                     <i className="fas fa-envelope mr-3 text-blue-400"></i>
                    <span>info@dietacademy.jp</span>
                </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="YouTube" className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110"><i className="fab fa-youtube text-2xl"></i></a>
              <a href="#" aria-label="X" className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110"><i className="fab fa-twitter text-2xl"></i></a>
              <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110"><i className="fab fa-facebook-f text-2xl"></i></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-6 text-center text-xs text-slate-500 space-y-1">
          <p>Copyright&copy; 日本ダイエットアカデミー協会</p>
          <p>運営：一般社団法人国家資格対策センター</p>
          <p>&copy; KSTC All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};