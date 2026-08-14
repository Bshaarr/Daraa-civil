import { useEffect, useState } from 'react';

export default function App() {
  const [statusMessage, setStatusMessage] = useState('جاري جلب البيانات من الـ API...');

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setStatusMessage(data.message);
        } else {
          setStatusMessage('تنبيه: ' + (data.message || data.error));
        }
      })
      .catch((err) => {
        setStatusMessage('حدث خطأ أثناء الاتصال بالـ API: ' + err.message);
      });
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f4f6f8',
      color: '#333'
    }}>
      <div style={{
        padding: '30px',
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2>نظام إدارة بيانات درعا</h2>
        <p style={{
          fontSize: '18px',
          color: statusMessage.includes('نجاح') ? '#10b981' : '#e11d48',
          fontWeight: 'bold',
          marginTop: '15px'
        }}>
          {statusMessage}
        </p>
      </div>
    </div>
  );
}
