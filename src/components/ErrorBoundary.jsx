import { Component } from 'react';
import { RefreshCw } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gb-bg flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="font-display text-lg font-bold text-gb-text mb-2">صار خطأ غير متوقع</h2>
            <p className="text-sm text-gb-muted mb-6">حاول تحدّث الصفحة</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gb-primary/15 text-gb-primary font-bold text-sm border border-gb-primary/25 hover:bg-gb-primary/25 transition-all active:scale-95"
            >
              <RefreshCw size={16} />
              تحديث الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
