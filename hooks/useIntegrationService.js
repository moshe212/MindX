import { useState, useCallback } from 'react';
import { integrationService } from '../services/index';

/**
 * Hook for managing integration-related operations
 */
export const useIntegrationService = () => {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingIntegrationId, setLoadingIntegrationId] = useState(null);

  /**
   * Fetches all integrations
   */
  const fetchIntegrations = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchedIntegrations = await integrationService.getIntegrations();
      setIntegrations(fetchedIntegrations);
    } catch (err) {
      console.error('Failed to fetch integrations:', err);
      setError(err.message || 'אירעה שגיאה בטעינת האינטגרציות');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Connects an integration
   */
  const connectIntegration = useCallback(async (id) => {
    setLoadingIntegrationId(id);
    setError(null);
    
    try {
      const updatedIntegration = await integrationService.connectIntegration(id);
      setIntegrations(prevIntegrations => 
        prevIntegrations.map(integration => 
          integration.id === id ? updatedIntegration : integration
        )
      );
      return updatedIntegration;
    } catch (err) {
      console.error('Failed to connect integration:', err);
      setError(err.message || 'אירעה שגיאה בהתחברות לאינטגרציה');
      throw err;
    } finally {
      setLoadingIntegrationId(null);
    }
  }, []);

  /**
   * Syncs an integration
   */
  const syncIntegration = useCallback(async (id) => {
    setLoadingIntegrationId(id);
    setError(null);
    
    try {
      const result = await integrationService.syncIntegration(id);
      return result;
    } catch (err) {
      console.error('Failed to sync integration:', err);
      setError(err.message || 'אירעה שגיאה בסנכרון האינטגרציה');
      throw err;
    } finally {
      setLoadingIntegrationId(null);
    }
  }, []);

  return {
    integrations,
    loading,
    error,
    loadingIntegrationId,
    fetchIntegrations,
    connectIntegration,
    syncIntegration
  };
};