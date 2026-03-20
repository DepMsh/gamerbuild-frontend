import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BuildProvider } from './hooks/BuildContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

// Eagerly load HomePage (first paint)
import HomePage from './pages/HomePage';

// Lazy load other pages
const BuilderPage = lazy(() => import('./pages/BuilderPage'));
const ComponentsPage = lazy(() => import('./pages/ComponentsPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const DealsPage = lazy(() => import('./pages/DealsPage'));
const AnalysisPage = lazy(() => import('./pages/AnalysisPage'));
const GamesPage = lazy(() => import('./pages/GamesPage'));
const PriceHistoryPage = lazy(() => import('./pages/PriceHistoryPage'));
const MyBuildsPage = lazy(() => import('./pages/MyBuildsPage'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gb-primary/30 border-t-gb-primary rounded-full animate-spin" />
        <span className="text-xs text-gb-muted">جاري التحميل...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BuildProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gb-bg text-gb-text font-body">
            <Navbar />
            <main>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/builder" element={<BuilderPage />} />
                  <Route path="/components" element={<ComponentsPage />} />
                  <Route path="/compare" element={<ComparePage />} />
                  <Route path="/deals" element={<DealsPage />} />
                  <Route path="/analysis" element={<AnalysisPage />} />
                  <Route path="/games" element={<GamesPage />} />
                  <Route path="/prices" element={<PriceHistoryPage />} />
                  <Route path="/my-builds" element={<MyBuildsPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </BuildProvider>
    </ErrorBoundary>
  );
}
