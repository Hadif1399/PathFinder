import { AppProvider, useApp } from './store/AppContext';
import Navigation from './components/Navigation';
import StarField from './components/StarField';
import FloatingBot from './components/FloatingBot';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import CataloguePage from './pages/CataloguePage';
import CareerDetailPage from './pages/CareerDetailPage';
import RoadmapPage from './pages/RoadmapPage';
import CertificatePage from './pages/CertificatePage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import UniversitiesPage from './pages/UniversitiesPage';
import PreUniScholarshipsPage from './pages/PreUniScholarshipsPage';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

function AppContent() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    if (state.explorationComplete && state.currentPage !== 'certificate') {
      dispatch({ type: 'NAVIGATE', page: 'certificate' });
    }
  }, [state.explorationComplete, state.currentPage, dispatch]);

  const renderPage = () => {
    switch (state.currentPage) {
      case 'home': return <HomePage />;
      case 'quiz': return <QuizPage />;
      case 'results': return <ResultsPage />;
      case 'catalogue': return <CataloguePage />;
      case 'career-detail': return <CareerDetailPage />;
      case 'roadmap': return <RoadmapPage />;
      case 'certificate': return <CertificatePage />;
      case 'scholarships': return <ScholarshipsPage />;
      case 'universities': return <UniversitiesPage />;
      case 'preuni-scholarships': return <PreUniScholarshipsPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-space-900 text-white overflow-x-hidden relative">
      <StarField />
      <Navigation />
      <AnimatePresence mode="wait">
        <motion.main key={state.currentPage} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
          {renderPage()}
        </motion.main>
      </AnimatePresence>
      <FloatingBot />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
