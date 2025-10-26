import React, { useState, useEffect, useRef } from 'react';

// Reusable Form Input Component
const FormInput: React.FC<{ id: string; type: string; label: string; icon: string; required?: boolean; }> = ({ id, type, label, icon, required }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-bold text-slate-700 mb-1.5">
            {label}
        </label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <i className={`fas ${icon} fa-fw`}></i>
            </span>
            <input
                type={type}
                id={id}
                name={id}
                required={required}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 transition-shadow"
            />
        </div>
    </div>
);

export const ContactWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const widgetRef = useRef<HTMLDivElement>(null);

    // Close widget if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);


    return (
        <div ref={widgetRef} className="fixed bottom-20 right-6 z-50">
            {/* Contact Form Panel */}
            <div
                className={`
                    absolute bottom-[62px] right-0 w-[calc(100vw-3.5rem)] sm:w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden
                    transition-all duration-300 ease-in-out origin-bottom-right
                    ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
                `}
            >
                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-rose-300 to-pink-300 text-white flex justify-between items-center" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                    <div>
                        <h3 className="font-bold text-xl">専門家と話そう</h3>
                        <p className="text-sm opacity-90 mt-0.5">ダイエットのお悩み、聞かせてください</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/70 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10"
                        aria-label="フォームを閉じる"
                    >
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>
                {/* Form Body */}
                <form className="p-5 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); alert('メッセージが送信されました！'); }}>
                    <FormInput id="name" type="text" label="お名前" icon="fa-user" required />
                    <FormInput id="email" type="email" label="メールアドレス" icon="fa-envelope" required />
                    <div>
                        <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-1.5">
                            メッセージ
                        </label>
                        <div className="relative">
                             <span className="absolute top-3.5 left-0 flex items-center pl-3.5 text-slate-400">
                                <i className="fas fa-pen fa-fw"></i>
                             </span>
                             <textarea
                                id="message"
                                name="message"
                                rows={4}
                                required
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 transition-shadow resize-none"
                             ></textarea>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-rose-400 to-pink-400 text-white font-bold text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-rose-400/50 transform hover:-translate-y-0.5"
                        >
                            <i className="fas fa-paper-plane mr-2.5"></i>
                            <span>送信</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Floating Action Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gradient-to-br from-rose-400 to-pink-400 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
                aria-label="お問い合わせフォームを開く"
                aria-expanded={isOpen}
            >
                <span className="relative w-6 h-6 flex items-center justify-center text-xl">
                    <i className={`fas fa-comments absolute transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}></i>
                    <i className={`fas fa-times absolute transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}></i>
                </span>
            </button>
        </div>
    );
};