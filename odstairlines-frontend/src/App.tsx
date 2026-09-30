import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { LandingPage } from './pages/LandingPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { authService } from './services/api';

type AppPage = 'landing' | 'contact' | 'admin_login' | 'admin_dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (
        path === '/internal-odst-gate/dashboard' ||
        path === '/admin/dashboard'
      ) {
        return authService.isAuthenticated() ? 'admin_dashboard' : 'admin_login';
      }
      if (
        path === '/internal-odst-gate' ||
        path === '/internal-odst-gate/' ||
        path === '/internal-odst-gate/login' ||
        path === '/admin' ||
        path === '/admin/' ||
        path === '/admin/login'
      ) {
        return authService.isAuthenticated() ? 'admin_dashboard' : 'admin_login';
      }
      if (path === '/contact' || path === '/contact/' || path === '/contact-us') {
        return 'contact';
      }
    }
    return 'landing';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (
        path.startsWith('/internal-odst-gate') ||
        path.startsWith('/admin')
      ) {
        if (path.includes('dashboard')) {
          setCurrentPage(authService.isAuthenticated() ? 'admin_dashboard' : 'admin_login');
        } else {
          setCurrentPage(authService.isAuthenticated() ? 'admin_dashboard' : 'admin_login');
        }
      } else if (path === '/contact' || path === '/contact/' || path === '/contact-us') {
        setCurrentPage('contact');
      } else {
        setCurrentPage('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: 'landing' | 'contact' | 'admin', sectionId?: string) => {
    if (page === 'admin') {
      if (authService.isAuthenticated()) {
        window.history.pushState(null, '', '/internal-odst-gate/dashboard');
        setCurrentPage('admin_dashboard');
      } else {
        window.history.pushState(null, '', '/internal-odst-gate');
        setCurrentPage('admin_login');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (page === 'contact') {
      window.history.pushState(null, '', '/contact');
      setCurrentPage('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState(null, '', '/');
      setCurrentPage('landing');
      if (sectionId && sectionId !== 'home') {
        setTimeout(() => {
          const elem = document.getElementById(sectionId);
          if (elem) {
            const navOffset = 80;
            const elemPos = elem.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: elemPos - navOffset,
              behavior: 'smooth',
            });
          }
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleLoginSuccess = () => {
    window.history.pushState(null, '', '/internal-odst-gate/dashboard');
    setCurrentPage('admin_dashboard');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleLogout = () => {
    window.history.pushState(null, '', '/internal-odst-gate');
    setCurrentPage('admin_login');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <ToastProvider>
      <LanguageProvider>
        {currentPage === 'admin_dashboard' ? (
          <AdminDashboardPage
            onLogout={handleLogout}
            onNavigateToSite={() => handleNavigate('landing')}
          />
        ) : currentPage === 'admin_login' ? (
          <AdminLoginPage
            onLoginSuccess={handleLoginSuccess}
            onBackToSite={() => handleNavigate('landing')}
          />
        ) : currentPage === 'contact' ? (
          <ContactPage onNavigate={(p, sec) => handleNavigate(p as any, sec)} />
        ) : (
          <LandingPage onNavigate={(p, sec) => handleNavigate(p as any, sec)} />
        )}
      </LanguageProvider>
    </ToastProvider>
  );
}
