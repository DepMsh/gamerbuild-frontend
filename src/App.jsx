import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BuildProvider } from './hooks/BuildContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import ComponentsPage from './pages/ComponentsPage';
import ComparePage from './pages/ComparePage';
import DealsPage from './pages/DealsPage';
import AnalysisPage from './pages/AnalysisPage';
import GamesPage from './pages/GamesPage';

export default function App() {
  return (
    <BuildProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gb-bg text-gb-text font-body">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/components" element={<ComponentsPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/games" element={<GamesPage />} />
            </Routes>
          </main>
          <Footer />
          <ChatAssistant />
        </div>
      </BrowserRouter>
    </BuildProvider>
  );
}
