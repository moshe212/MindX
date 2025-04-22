import React from "react";
import { Link2 } from "lucide-react";
import { useIntegrationService } from "../../hooks/useIntegrationService";

const IntegrationCard = ({ integration }) => {
  const { connectIntegration, syncIntegration, loadingIntegrationId } =
    useIntegrationService();
  const { id, name, category, description, isConnected } = integration;

  const handleConnect = async () => {
    try {
      await connectIntegration(id);
    } catch (error) {
      console.error("Failed to connect integration:", error);
    }
  };

  const handleSync = async () => {
    try {
      await syncIntegration(id);
    } catch (error) {
      console.error("Failed to sync integration:", error);
    }
  };

  const isLoading = loadingIntegrationId === id;

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
      <div className="bg-gray-800 p-4 flex items-center border-b border-gray-700">
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-cyan-400 ml-3">
          <Link2 size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-200">{name}</h3>
          <p className="text-xs text-gray-400">{category}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-400 mb-4">{description}</p>

        <div className="flex flex-wrap gap-4">
          <button
            className="flex-grow bg-cyan-600 text-gray-100 px-3 py-2 rounded-md hover:bg-cyan-700 transition-colors text-sm disabled:opacity-50 cursor-pointer"
            onClick={isConnected ? handleSync : handleConnect}
            disabled={isLoading}
          >
            {isLoading ? "מעבד..." : isConnected ? "סנכרן עכשיו" : "התחבר"}
          </button>

          {isConnected && (
            <button
              className="flex-grow bg-gray-700 text-gray-300 px-3 py-2 rounded-md hover:bg-gray-600 transition-colors text-sm cursor-pointer"
              disabled={isLoading}
            >
              הגדרות
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(IntegrationCard);
