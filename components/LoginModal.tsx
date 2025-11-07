import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
        setUsername('');
        setPassword('');
        setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'test' && password === 'test') {
      onLoginSuccess();
    } else {
      setError('ユーザー名またはパスワードが正しくありません。');
    }
  };

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
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm md:max-w-4xl transform animate-scale-up flex overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Image */}
        <div 
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540492819385-1_a4b4a7376d?q=80&w=1964&auto-format&fit=crop')" }}
        >
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center relative">
           <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100"
              aria-label="閉じる"
            >
                <i className="fas fa-times text-xl"></i>
            </button>
            
            <div className="w-full max-w-sm mx-auto">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-slate-800">メンバーログイン</h2>
                    <p className="text-slate-500 mt-2">おかえりなさい！学習を続けましょう。</p>
                </div>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-bold text-slate-700 mb-1.5 sr-only">
                            ユーザー名
                        </label>
                        <div className="relative">
                             <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                <i className="fas fa-user"></i>
                             </span>
                             <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="ユーザー名"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-100 text-slate-900 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white focus:border-rose-300 transition-all"
                             />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password"className="block text-sm font-bold text-slate-700 mb-1.5 sr-only">
                            パスワード
                        </label>
                         <div className="relative">
                             <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                <i className="fas fa-lock"></i>
                             </span>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="パスワード"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-100 text-slate-900 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white focus:border-rose-300 transition-all"
                            />
                        </div>
                    </div>
                    
                    {error && <p className="text-red-600 text-sm font-semibold text-center" role="alert">{error}</p>}
                    
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-rose-500 border-slate-300 rounded focus:ring-rose-400"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-slate-800">
                                ログインを保存
                            </label>
                        </div>
                        <a href="#" className="font-semibold text-rose-500 hover:underline">
                            パスワードを忘れましたか？
                        </a>
                    </div>
                    
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-rose-400 to-pink-400 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-rose-400/50 transform hover:-translate-y-1 active:scale-95"
                        >
                            <i className="fas fa-right-to-bracket mr-3"></i>
                            <span>ログイン</span>
                        </button>
                    </div>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-slate-200"></div>
                        <span className="flex-shrink mx-4 text-slate-400 text-sm font-semibold">または</span>
                        <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    <div className="flex items-center justify-center">
                        <a href="#" className="font-medium text-sm text-slate-700 hover:text-rose-500 transition-colors">
                            アカウントをお持ちでないですか？ <span className="font-bold underline">新規登録</span>
                        </a>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
