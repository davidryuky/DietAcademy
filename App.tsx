import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './components/HomePage';
import { TestPage } from './components/TestPage';
import { MembersPage } from './components/MembersPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    navigate('/members');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const isMembersPage = location.pathname.startsWith('/members');

  return (
    <MainLayout
      isAuthenticated={isAuthenticated}
      onLogout={handleLogout}
      isLoginModalOpen={isLoginModalOpen}
      onLoginClick={openLoginModal}
      onLoginModalClose={closeLoginModal}
      onLoginSuccess={handleLoginSuccess}
      showContactWidget={!isMembersPage}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/members" element={isAuthenticated ? <MembersPage /> : <Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
};

export default App;