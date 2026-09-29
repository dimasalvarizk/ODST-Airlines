import { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { LandingPage } from './pages/LandingPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'contact'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path === '/contact' || path === '/contact/' || path === '/contact-us') {
        return 'contact';
      }
    }
    return 'landing';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/contact' || path === '/contact/' || path === '/contact-us') {
        setCurrentPage('contact');
      } else {
        setCurrentPage('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: 'landing' | 'contact', sectionId?: string) => {
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

  return (
    <ToastProvider>
      <LanguageProvider>
        {currentPage === 'contact' ? (
          <ContactPage onNavigate={handleNavigate} />
        ) : (
          <LandingPage onNavigate={handleNavigate} />
        )}
      </LanguageProvider>
    </ToastProvider>
  );
}
