import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { HomePage } from './components/HomePage';
import { TestPage } from './components/TestPage';
import { MembersPage } from './components/MembersPage';
import { VideoLecturesPage } from './components/VideoLecturesPage';

const App: React.FC = () => {
  // Initialize authentication state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = () => {
    // Persist authentication state
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    navigate('/members');
  };

  const handleLogout = () => {
    // Clear persisted authentication state
    localStorage.removeItem('isAuthenticated');
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
        <Route path="/members/movies-regular" element={isAuthenticated ? <VideoLecturesPage /> : <Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
};

export default App;