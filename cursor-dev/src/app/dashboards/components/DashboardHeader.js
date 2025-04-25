'use client';

export default function DashboardHeader({ isSidebarOpen, onToggleSidebar }) {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-purple-400 to-amber-300 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isSidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              )}
            </svg>
          </button>
          <div>
            <h4 className="text-white/80 text-sm mb-2">CURRENT PLAN</h4>
            <h1 className="text-white text-3xl font-semibold">Researcher</h1>
          </div>
          <div className="ml-auto">
            <button className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
              Manage Plan
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2 text-white/90 mb-2">
            <span>API Limit</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="bg-white/10 rounded-full h-2 w-full">
            <div className="bg-white h-full rounded-full" style={{ width: '2.4%' }} />
          </div>
          <div className="text-white/80 text-sm mt-2">24/1,000 Requests</div>
        </div>
      </div>
    </div>
  );
} 