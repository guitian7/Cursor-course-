'use client';

export default function EditApiKeyModal({ 
  show, 
  onClose, 
  editKeyName, 
  setEditKeyName, 
  onSave 
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">Edit API key</h2>
        <p className="text-gray-600 mb-6">Update the name of your API key.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Key Name — <span className="text-gray-600">A unique name to identify this key</span>
            </label>
            <input
              type="text"
              value={editKeyName}
              onChange={(e) => setEditKeyName(e.target.value)}
              placeholder="Enter a new name for your API key"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
            />
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
            onClick={onSave}
            disabled={!editKeyName.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 