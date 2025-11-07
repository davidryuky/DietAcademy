import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './components/HomePage';
import { TestPage } from './components/TestPage';
import { MembersPage } from './components/MembersPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <MainLayout
      isAuthenticated={isAuthenticated}
      onLogout={handleLogout}
      isLoginModalOpen={isLoginModalOpen}
      onLoginClick={openLoginModal}
      onLoginModalClose={closeLoginModal}
      onLoginSuccess={handleLoginSuccess}
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
