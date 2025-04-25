'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Notification from '../components/Notification';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const router = useRouter();

  // Effect to handle notification timeout
  useEffect(() => {
    let timeoutId;
    if (notification.show) {
      timeoutId = setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [notification.show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (data.valid) {
        setNotification({
          show: true,
          message: 'Valid API Key, /protected can be accessed',
          type: 'success'
        });
        router.push('/protected');
      } else {
        setNotification({
          show: true,
          message: 'Invalid API Key',
          type: 'delete'
        });
      }
    } catch (error) {
      setNotification({
        show: true,
        message: 'Error validating API key',
        type: 'error'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">API Playground</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your API Key
              </label>
              <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Validate API Key
            </button>
          </form>
        </div>
      </div>

      <Notification 
        notification={notification} 
        onClose={() => setNotification({ show: false, message: '', type: '' })} 
      />
    </div>
  );
} 