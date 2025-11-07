import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  showContactWidget: boolean;
}> = ({
  children,
  isAuthenticated,
  onLogout,
  isLoginModalOpen,
  onLoginClick,
  onLoginModalClose,
  onLoginSuccess,
  showContactWidget,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const location = useLocation();

  // Conditionally render layout based on route
  const isVideoPage = location.pathname === '/members/movies-regular';

  if (isVideoPage) {
    return <>{children}</>; // Render only the video page component
  }

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
        onLogout={onLogout}
      />
      <main className={isMenuOpen ? 'hidden' : ''}>{children}</main>
      <Footer />
      {showContactWidget && <ContactWidget />}
      <ScrollToTopButton />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={onLoginModalClose}
        onLoginSuccess={onLoginSuccess}
      />
    </div>
  );
};