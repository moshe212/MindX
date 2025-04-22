import React, { useEffect } from 'react';
import IntegrationCard from './IntegrationCard';
import { useIntegrationService } from '../../hooks/useIntegrationService';

const IntegrationsTab = () => {
  const { integrations, loading, error, fetchIntegrations } = useIntegrationService();

  useEffect(() => {
    fetchIntegrations();
  }, [fetchIntegrations]);

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-gray-900 p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-100">אינטגרציות</h2>
      </div>
      
      {error && (
        <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center my-12">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map(integration => (
            <IntegrationCard 
              key={integration.id} 
              integration={integration} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IntegrationsTab;