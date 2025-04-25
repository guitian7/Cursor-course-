'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Sidebar from '../components/Sidebar';
import Notification from '../components/Notification';
import DashboardHeader from './components/DashboardHeader';
import ApiKeyTable from './components/ApiKeyTable';
import CreateApiKeyModal from './components/CreateApiKeyModal';
import EditApiKeyModal from './components/EditApiKeyModal';
import DeleteApiKeyModal from './components/DeleteApiKeyModal';

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [editKeyName, setEditKeyName] = useState('');
  const [newKeyName, setNewKeyName] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState('1000');
  const [limitEnabled, setLimitEnabled] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showKey, setShowKey] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fetch API keys on component mount
  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApiKeys(data);
    } catch (err) {
      console.error('Error fetching API keys:', err);
      setError('Failed to load API keys');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 2000);
  };

  const createApiKey = async () => {
    if (!newKeyName) return;
    
    try {
      const newKey = {
        name: newKeyName,
        value: `ciri_${Math.random().toString(36).substr(2, 32)}`,
        usage: limitEnabled ? parseInt(monthlyLimit) : 0
      };

      const { data, error } = await supabase
        .from('api_keys')
        .insert([newKey])
        .select()
        .single();

      if (error) throw error;

      setApiKeys([data, ...apiKeys]);
      setNewKeyName('');
      setMonthlyLimit('1000');
      setLimitEnabled(true);
      setShowCreateModal(false);
      showNotification('API key created successfully');
    } catch (err) {
      console.error('Error creating API key:', err);
      setError('Failed to create API key');
    }
  };

  const handleEdit = (key) => {
    setEditingKey(key);
    setEditKeyName(key.name);
    setShowEditModal(true);
  };

  const saveEdit = async () => {
    if (!editKeyName.trim()) return;
    
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .update({ name: editKeyName.trim() })
        .eq('id', editingKey.id)
        .select()
        .single();

      if (error) throw error;

      setApiKeys(apiKeys.map(key => 
        key.id === editingKey.id ? data : key
      ));
      setShowEditModal(false);
      setEditingKey(null);
      setEditKeyName('');
      showNotification('API key updated successfully');
    } catch (err) {
      console.error('Error updating API key:', err);
      setError('Failed to update API key');
    }
  };

  const deleteApiKey = async (id) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setApiKeys(apiKeys.filter(key => key.id !== id));
      setShowDeleteConfirm(null);
      showNotification('API key deleted successfully', 'delete');
    } catch (err) {
      console.error('Error deleting API key:', err);
      setError('Failed to delete API key');
    }
  };

  const copyToClipboard = async (value, id) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = value;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
        textArea.remove();
      }
      setCopiedId(id);
      showNotification('Copied API Key to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatUsage = (usage) => {
    return usage || '0';
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar isOpen={isSidebarOpen} />

      <main className="flex-1">
        <DashboardHeader 
          isSidebarOpen={isSidebarOpen} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />

        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">API Keys</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg border hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New API Key
            </button>
          </div>

          <ApiKeyTable 
            apiKeys={apiKeys}
            showKey={showKey}
            setShowKey={setShowKey}
            copiedId={copiedId}
            onCopy={copyToClipboard}
            onEdit={handleEdit}
            onDelete={(id) => setShowDeleteConfirm(id)}
            formatUsage={formatUsage}
          />

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
              <button
                onClick={() => setError(null)}
                className="absolute top-2 right-2 text-red-700"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <CreateApiKeyModal 
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        newKeyName={newKeyName}
        setNewKeyName={setNewKeyName}
        monthlyLimit={monthlyLimit}
        setMonthlyLimit={setMonthlyLimit}
        limitEnabled={limitEnabled}
        setLimitEnabled={setLimitEnabled}
        onCreate={createApiKey}
      />

      <EditApiKeyModal 
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingKey(null);
          setEditKeyName('');
        }}
        editKeyName={editKeyName}
        setEditKeyName={setEditKeyName}
        onSave={saveEdit}
      />

      <DeleteApiKeyModal 
        show={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onDelete={() => deleteApiKey(showDeleteConfirm)}
      />

      {/* Notification Component */}
      <Notification 
        notification={notification} 
        onClose={() => setNotification({ show: false, message: '', type: '' })} 
      />
    </div>
  );
} 