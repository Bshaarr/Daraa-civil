import React from 'react';

export default function HomePage() {
  return (
    <div className="p-8 text-right bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">أهلاً بك في منصة درعا</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600">هذا هو موقعك الأساسي، يمكنك الآن إضافة روابط الخدمات هنا.</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">خدمات المدنية</button>
      </div>
    </div>
  );
}
