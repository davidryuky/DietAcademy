import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTopButton } from './ScrollToTopButton';
import { MobileDrawer } from './MobileDrawer';
import { LoginModal } from './LoginModal';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50">
      <Header 
        isMenuOpen={isMenuOpen} 
        onMenuToggle={toggleMenu} 
        onLoginClick={openLoginModal} 
      />
      <MobileDrawer 
        isOpen={isMenuOpen} 
        onClose={toggleMenu} 
        onLoginClick={openLoginModal} 
      />
      {/* Page-specific content will be rendered here */}
      <main className={isMenuOpen ? 'hidden' : ''}>
        {children}
      </main>
      <Footer />
      <ScrollToTopButton />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};