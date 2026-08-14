import React from "react";

type BoundaryState = { hasError: boolean; error?: Error };
export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, BoundaryState> {
  state: BoundaryState = { hasError: false };
  static getDerivedStateFromError(error: Error): BoundaryState { return { hasError: true, error }; }
  render() { if (this.state.hasError) return <div dir="rtl" className="flex min-h-screen items-center justify-center p-6"><div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800"><h1 className="mb-2 text-lg font-bold">حدث خطأ غير متوقع</h1><p>يرجى تحديث الصفحة والمحاولة مجدداً.</p></div></div>; return (this as any).props?.children; }
}
