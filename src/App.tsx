import React from 'react';
import * as HomePageModule from './pages/Home';

// يجلب المكون سواء كان default أو named export
const HomePage = HomePageModule.default || HomePageModule.Home || Object.values(HomePageModule)[0];

export default function App() {
  const Component = HomePage as React.ComponentType;
  return (
    <div className="min-h-screen bg-gray-50">
      {Component ? <Component /> : <div>جاري تحميل الصفحة...</div>}
    </div>
  );
}
