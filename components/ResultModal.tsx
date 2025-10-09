import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ResultCard } from './ResultDisplay';
import type { ResultData } from '../types';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResultData | null;
}

export const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
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

  if (!isOpen || !data) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-slate-50 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform animate-scale-up flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white p-3 border-b z-10 flex justify-between items-center flex-shrink-0">
            <h2 className="text-xl font-bold text-slate-800">あなたのダイエットプラン</h2>
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-slate-800 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
              aria-label="閉じる"
            >
                <i className="fas fa-times text-xl"></i>
            </button>
        </div>
        <div className="p-4">
            <ResultCard data={data} />
        </div>
      </div>
    </div>,
    document.body
  );
};