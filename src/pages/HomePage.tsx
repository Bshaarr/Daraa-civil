import React from 'react';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '2rem', direction: 'rtl', textAlign: 'center' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '500px', margin: '2rem auto' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>أهلاً بك في منصة درعا المدنية</h1>
        <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>الموقع يعمل الآن بشكل ممتاز ومستقر.</p>
        <button style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '0.5rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
          استعراض الخدمات
        </button>
      </div>
    </div>
  );
}
