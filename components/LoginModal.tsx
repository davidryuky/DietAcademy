import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md transform animate-scale-up flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-5 border-b border-slate-200 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center mb-3">
                <i className="fas fa-user-lock text-3xl text-rose-500"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">メンバーエリア</h2>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-800 transition-colors w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100"
              aria-label="閉じる"
            >
                <i className="fas fa-times text-xl"></i>
            </button>
        </div>
        {/* Body */}
        <div className="p-6 sm:p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="username" className="block text-sm font-bold text-slate-700 mb-2">
                        ユーザー名:
                    </label>
                    <div className="relative">
                         <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                            <i className="fas fa-user"></i>
                         </span>
                         <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full pl-12 pr-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 transition-shadow"
                         />
                    </div>
                </div>
                <div>
                    <label htmlFor="password"className="block text-sm font-bold text-slate-700 mb-2">
                        パスワード:
                    </label>
                     <div className="relative">
                         <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                            <i className="fas fa-lock"></i>
                         </span>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full pl-12 pr-4 py-3 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 transition-shadow"
                        />
                    </div>
                </div>
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-rose-500 border-slate-300 rounded focus:ring-rose-400"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-800">
                        ログインを保存する
                    </label>
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-400 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-rose-400/50 transform hover:-translate-y-1"
                    >
                        <i className="fas fa-right-to-bracket mr-3"></i>
                        <span>ログイン</span>
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>,
    document.body
  );
};