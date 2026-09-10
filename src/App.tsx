import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import Navigation from './components/Navigation';
import CompanionBot from './components/CompanionBot';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';
import CataloguePage from './pages/CataloguePage';
import CareerDetailPage from './pages/CareerDetailPage';
import RoadmapPage from './pages/RoadmapPage';
import CompletionPage from './pages/CompletionPage';
import CertificatePage from './pages/CertificatePage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-space-900 stars-bg">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/career/:id" element={<CareerDetailPage />} />
            <Route path="/roadmap/:id" element={<RoadmapPage />} />
            <Route path="/completion" element={<CompletionPage />} />
            <Route path="/certificate" element={<CertificatePage />} />
          </Routes>
          <CompanionBot />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
