import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 dir-rtl text-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">منصة خدمات درعا المدنية</h1>
        <p className="text-gray-600 mb-6">الموقع يعمل الآن بنجاح وجاهز لاستعراض المكونات.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          تحديث الصفحة
        </button>
      </div>
    </div>
  );
}
