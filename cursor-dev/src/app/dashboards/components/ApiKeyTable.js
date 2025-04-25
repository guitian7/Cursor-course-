'use client';

export default function ApiKeyTable({ 
  apiKeys, 
  showKey, 
  setShowKey, 
  copiedId, 
  onCopy, 
  onEdit, 
  onDelete,
  formatUsage 
}) {
  return (
    <div className="bg-white rounded-lg border">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">NAME</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">USAGE</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">KEY</th>
            <th className="text-center px-6 py-4 text-sm font-medium text-gray-500">OPTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {apiKeys.map((key) => (
            <tr key={key.id} className="group">
              <td className="px-6 py-4">
                <span className="font-medium text-gray-900">{key.name}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-gray-600">{formatUsage(key.usage)}</span>
              </td>
              <td className="px-6 py-4">
                <div className="font-mono text-gray-600">
                  {showKey === key.id ? key.value : key.value.replace(/./g, '*')}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  {/* View/Hide Button */}
                  <button
                    onClick={() => setShowKey(showKey === key.id ? null : key.id)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title={showKey === key.id ? "Hide API Key" : "Show API Key"}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d={showKey === key.id 
                          ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" 
                          : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        }
                      />
                    </svg>
                  </button>
                  {/* Copy Button */}
                  <button
                    onClick={() => onCopy(key.value, key.id)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="Copy to clipboard"
                  >
                    {copiedId === key.id ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    )}
                  </button>
                  {/* Edit Button */}
                  <button
                    onClick={() => onEdit(key)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="Edit API Key"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => onDelete(key.id)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="Delete API Key"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {apiKeys.length === 0 && (
            <tr>
              <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                No API keys created yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 