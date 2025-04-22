import React, { lazy, Suspense } from 'react';

// Lazy load tabs for better performance
const ConversationTab = lazy(() => import('../conversation/ConversationTab'));
const DataInputTab = lazy(() => import('../dataInput/DataInputTab'));
const UsersTab = lazy(() => import('../users/UsersTab'));
const IntegrationsTab = lazy(() => import('../integrations/IntegrationsTab'));
const AnalyticsTab = lazy(() => import('../analytics/AnalyticsTab'));

const MainContent = ({ activeTab }) => {
  // Loading state for lazy loaded components
  const renderLoader = () => (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <main className="flex-grow overflow-hidden bg-gray-900">
      <Suspense fallback={renderLoader()}>
        {activeTab === 'conversation' && <ConversationTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'dataInput' && <DataInputTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'integrations' && <IntegrationsTab />}
      </Suspense>
    </main>
  );
};

export default MainContent;