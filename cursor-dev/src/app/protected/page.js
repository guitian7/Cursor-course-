'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Notification from '../components/Notification';

export default function Protected() {
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const router = useRouter();

  useEffect(() => {
    // Check if the user has a valid API key in localStorage
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
      //router.push('/playground');
      return;
    }

    // Validate the API key
    const validateApiKey = async () => {
      try {
        const response = await fetch('/api/validate-key', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ apiKey }),
        });

        const data = await response.json();

        if (!data.valid) {
          setNotification({
            show: true,
            message: 'Invalid API Key',
            type: 'error'
          });
          router.push('/playground');
        }
      } catch (error) {
        console.error('Error validating API key:', error);
        setNotification({
          show: true,
          message: 'Error validating API key',
          type: 'error'
        });
        router.push('/playground');
      }
    };

    validateApiKey();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Protected Content</h1>
          <p className="text-gray-600">
            This is a protected page that can only be accessed with a valid API key.
          </p>
        </div>
      </div>

      <Notification 
        notification={notification} 
        onClose={() => setNotification({ show: false, message: '', type: '' })} 
      />
    </div>
  );
} 