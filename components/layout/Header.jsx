import React from "react";
import { MessageCircle, BarChart2, Upload, Users, Link2 } from "lucide-react";
import { useUiContext } from "../../context/UiContext";
import { useAuthContext } from "../../context/AuthContext";

const Header = () => {
  const { state, setActiveTab } = useUiContext();
  const { activeTab } = state;
  const { currentUser } = useAuthContext();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Extract first letter of user's name for avatar
  const userInitial = currentUser?.name ? currentUser.name.charAt(0) : "א";

  return (
    <header className="bg-gray-900 shadow-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-cyan-400">קוגלי</span>
            <span className="text-sm bg-cyan-900 text-cyan-300 px-2 py-1 rounded">
              AI
            </span>
          </div>

          <nav className="flex gap-4">
            <button
              className={`px-4 py-2 rounded-md flex items-center transition-all cursor-pointer ${
                activeTab === "conversation"
                  ? "bg-gray-800 text-cyan-400 border-b-2 border-cyan-400"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => handleTabChange("conversation")}
              aria-label="לשונית שיחה"
            >
              <MessageCircle size={18} className="ml-2" />
              <span>שיחה</span>
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center transition-all cursor-pointer ${
                activeTab === "analytics"
                  ? "bg-gray-800 text-cyan-400 border-b-2 border-cyan-400"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => handleTabChange("analytics")}
              aria-label="לשונית אנליזות"
            >
              <BarChart2 size={18} className="ml-2" />
              <span>אנליזות</span>
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center transition-all cursor-pointer ${
                activeTab === "dataInput"
                  ? "bg-gray-800 text-cyan-400 border-b-2 border-cyan-400"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => handleTabChange("dataInput")}
              aria-label="לשונית הזנת נתונים"
            >
              <Upload size={18} className="ml-2" />
              <span>הזנת נתונים</span>
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center transition-all cursor-pointer ${
                activeTab === "users"
                  ? "bg-gray-800 text-cyan-400 border-b-2 border-cyan-400"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => handleTabChange("users")}
              aria-label="לשונית משתמשים"
            >
              <Users size={18} className="ml-2" />
              <span>משתמשים</span>
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center transition-all cursor-pointer ${
                activeTab === "integrations"
                  ? "bg-gray-800 text-cyan-400 border-b-2 border-cyan-400"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => handleTabChange("integrations")}
              aria-label="לשונית אינטגרציות"
            >
              <Link2 size={18} className="ml-2" />
              <span>אינטגרציות</span>
            </button>
          </nav>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-200">
              {userInitial}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
