import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Reusable Form Input Component, used inside the modal
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

// The Modal component containing the contact form
const ContactFormModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEsc);
        } else {
            document.body.style.overflow = 'unset';
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
                className="bg-white rounded-xl shadow-2xl w-full max-w-md transform animate-scale-up flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="p-5 bg-gradient-to-r from-rose-300 to-pink-300 text-white flex justify-between items-center" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                    <div>
                        <h3 className="font-bold text-2xl">専門家と話そう</h3>
                        <p className="text-sm opacity-90 mt-0.5">ダイエットのお悩み、聞かせてください</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white transition-colors w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/10"
                        aria-label="フォームを閉じる"
                    >
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>
                {/* Modal Form Body */}
                <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); alert('メッセージが送信されました！'); }}>
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
        </div>,
        document.body
    );
};


// Main component that renders the button and manages the modal state
export const ContactWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Action Button */}
            <div className="fixed bottom-20 right-6 z-40">
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-br from-rose-400 to-pink-400 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
                    aria-label="お問い合わせフォームを開く"
                >
                    <i className="fas fa-comments text-2xl"></i>
                </button>
            </div>
            
            {/* Contact Modal */}
            <ContactFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};