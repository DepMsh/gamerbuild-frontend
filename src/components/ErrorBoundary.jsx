import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#060610] text-white text-center p-8">
          <div>
            <div className="text-5xl mb-4">😅</div>
            <h1 className="text-2xl font-bold mb-3">صار خطأ</h1>
            <p className="text-gray-400 mb-6">جرب تحدّث الصفحة</p>
            <button
              onClick={() => location.reload()}
              className="bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold"
            >
              حدّث
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
