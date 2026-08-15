import React from 'react';
import Home from './pages/Home';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: string}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: '' };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error.toString() };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-right dir-rtl">
          <h2 className="text-xl font-bold text-red-600 mb-2">حدث خطأ أثناء تحميل مكونات الصفحة:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm text-red-800 overflow-x-auto">{this.state.error}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
}
