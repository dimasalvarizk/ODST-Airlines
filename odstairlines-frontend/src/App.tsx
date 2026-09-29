import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { LandingPage } from './pages/LandingPage';

export default function App() {
  return (
    <ToastProvider>
      <LanguageProvider>
        <LandingPage />
      </LanguageProvider>
    </ToastProvider>
  );
}
