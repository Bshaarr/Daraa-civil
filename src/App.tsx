import React from 'react';
import HomePage from './pages/HomePage';

// حماية شاملة لمنع أي شاشة بيضاء واستعراض الخطأ إن وجد
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: string}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: '' };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error.toString() };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("Render Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 dir-rtl text-right bg-red-50 min-h-screen">
          <h2 className="text-xl font-bold text-red-600 mb-2">تنبيه في أحد مكونات الصفحة:</h2>
          <pre className="bg-white p-4 rounded border border-red-200 text-sm text-red-800 overflow-x-auto">
            {this.state.error}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <HomePage />
    </ErrorBoundary>
  );
}
