'use client';

export default function CreateApiKeyModal({ 
  show, 
  onClose, 
  newKeyName, 
  setNewKeyName, 
  monthlyLimit, 
  setMonthlyLimit, 
  limitEnabled, 
  setLimitEnabled, 
  onCreate 
}) {
  if (!show) return null;

  const handleMonthlyLimitChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setMonthlyLimit(value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">Create a new API key</h2>
        <p className="text-gray-600 mb-6">Enter a name and limit for the new API key.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Key Name — <span className="text-gray-600">A unique name to identify this key</span>
            </label>
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Enter a name for your API key"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500 bg-white"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-1">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                checked={limitEnabled}
                onChange={(e) => setLimitEnabled(e.target.checked)}
              />
              Limit monthly usage<span className="text-gray-600">*</span>
            </label>
            <input
              type="text"
              value={monthlyLimit}
              onChange={handleMonthlyLimitChange}
              disabled={!limitEnabled}
              placeholder="Enter number of requests per month"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500 bg-white disabled:bg-gray-50 disabled:text-gray-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              * If the combined usage of all your keys exceeds your plans limit, all requests will be rejected.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white hover:bg-gray-600 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            disabled={!newKeyName}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 
