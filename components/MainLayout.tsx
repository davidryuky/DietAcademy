import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTopButton } from './ScrollToTopButton';
import { MobileDrawer } from './MobileDrawer';
import { LoginModal } from './LoginModal';
import { ContactWidget } from './ContactWidget';

export const MainLayout: React.FC<{
  children: React.ReactNode;
  isAuthenticated: boolean;
  onLogout: () => void;
  isLoginModalOpen: boolean;
  onLoginClick: () => void;
  onLoginModalClose: () => void;
  onLoginSuccess: () => void;
}> = ({
  children,
  isAuthenticated,
  onLogout,
  isLoginModalOpen,
  onLoginClick,
  onLoginModalClose,
  onLoginSuccess,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50">
      <Header
        isMenuOpen={isMenuOpen}
        onMenuToggle={toggleMenu}
        onLoginClick={onLoginClick}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
      />
      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        isAuthenticated={isAuthenticated}
      />
      <main className={isMenuOpen ? 'hidden' : ''}>{children}</main>
      <Footer />
      <ContactWidget />
      <ScrollToTopButton />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={onLoginModalClose}
        onLoginSuccess={onLoginSuccess}
      />
    </div>
  );
};
