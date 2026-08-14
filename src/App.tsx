import { useEffect, useState } from 'react';

export default function App() {
  const [statusMessage, setStatusMessage] = useState('جاري الاتصال بقاعدة البيانات...');

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setStatusMessage(data.message);
        } else {
          setStatusMessage('خطأ: ' + (data.error || data.message));
        }
      })
      .catch(() => setStatusMessage('فشل الاتصال بالخادم'));
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h2>حالة الاتصال عبر Vercel API:</h2>
      <p style={{ fontSize: '18px', color: '#0070f3', fontWeight: 'bold' }}>
        {statusMessage}
      </p>
    </div>
  );
}
