import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import Navigation from './components/Navigation';
import CompanionBot from './components/CompanionBot';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import CareerDetailPage from './pages/CareerDetailPage';
import UniversitiesPage from './pages/UniversitiesPage';
import PreUniScholarshipsPage from './pages/PreUniScholarshipsPage';
import ScholarshipsPage from './pages/ScholarshipsPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-900">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/career/:id" element={<CareerDetailPage />} />
            <Route path="/universities" element={<UniversitiesPage />} />
            <Route path="/preuni-scholarships" element={<PreUniScholarshipsPage />} />
            <Route path="/scholarships" element={<ScholarshipsPage />} />
          </Routes>
          <CompanionBot />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
