// src/ModulePage.jsx
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ModuleComponent from './components/ModuleComponent';
import { supabase } from "./supabaseClient"; // Added Supabase import

// Import your constants
import {
  module1Data, module2Data, module3Data, module4Data, module5Data,
  module6Data, module7Data, module8Data, module9Data, module10Data,
  module11Data, module12Data, module13Data, module14Data, module15Data,
  module16Data, module17Data, module18Data,
} from './constants/modules';

const MODULES_MAP = {
  1: module1Data, 2: module2Data, 3: module3Data, 4: module4Data, 5: module5Data,
  6: module6Data, 7: module7Data, 8: module8Data, 9: module9Data, 10: module10Data,
  11: module11Data, 12: module12Data, 13: module13Data, 14: module14Data, 15: module15Data,
  16: module16Data, 17: module17Data, 18: module18Data,
};

export default function ModulePage({ theme = 'dark', user }) {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  
  const [moduleData, setModuleData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- START TIME TRACKING HOOK ---
  const timeAccumulated = useRef(0);
  const syncInterval = useRef(null);

  useEffect(() => {
    // Module 18 is intentionally frontend-only (no tracking syncs)
    if (parseInt(moduleId) === 18) return;

    // Make sure we have a logged-in user
    if (!user?.id) return;

    // 1. Increment timer every second locally
    const timer = setInterval(() => {
      timeAccumulated.current += 1;
    }, 1000);

    // 2. Sync to Supabase every 60 seconds to avoid API rate limiting
    syncInterval.current = setInterval(async () => {
      if (timeAccumulated.current > 0) {
        const timeToSync = timeAccumulated.current;
        timeAccumulated.current = 0; // Reset local accumulator

        try {
          const { data: { user: authUser }, error } = await supabase.auth.getUser();
          if (!error && authUser) {
            const currentTotal = authUser.user_metadata?.total_time_invested || 0;
            await supabase.auth.updateUser({
              data: {
                total_time_invested: currentTotal + timeToSync
              }
            });
          }
        } catch (err) {
          // If sync fails, add the time back so we try again next cycle
          timeAccumulated.current += timeToSync;
        }
      }
    }, 60000); // 60,000ms = 1 minute

    // 3. Cleanup on unmount (save any remaining seconds when they leave the module)
    return () => {
      clearInterval(timer);
      clearInterval(syncInterval.current);

      if (timeAccumulated.current > 0) {
        const finalTime = timeAccumulated.current;
        supabase.auth.getUser().then(({ data: { user: authUser } }) => {
          if (authUser) {
            const currentTotal = authUser.user_metadata?.total_time_invested || 0;
            supabase.auth.updateUser({
              data: { total_time_invested: currentTotal + finalTime }
            });
          }
        });
      }
    };
  }, [user, moduleId]);
  // --- END TIME TRACKING HOOK ---

  useEffect(() => {
    // 1. Grab the correct module data based on the URL ID
    const fetchModuleData = async () => {
      setLoading(true);
      try {
        const fallbackData = MODULES_MAP[parseInt(moduleId)];
        if (fallbackData) {
          setModuleData(fallbackData);
        } else {
          toast.error('Module not found.');
        }
      } catch (err) {
        console.error('Error loading module data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId]);

  // 2. Handle Loading State
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-gray-50' : 'bg-[#060A1E]'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Loading module...</p>
        </div>
      </div>
    );
  }

  // 3. Handle 404 / Not Found State
  if (!moduleData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'light' ? 'bg-gray-50' : 'bg-[#060A1E]'}`}>
        <div className={`text-center p-8 rounded-lg border ${theme === 'light' ? 'bg-white shadow-lg border-gray-200' : 'bg-black/40 backdrop-blur-md shadow-xl border-white/10'}`}>
          <h1 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Module Not Found
          </h1>
          <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Module {moduleId} is not available.
          </p>
          <button
            onClick={() => navigate('/modules')}
            className="px-6 py-2 rounded-lg transition bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 font-semibold"
          >
            Back to Modules
          </button>
        </div>
      </div>
    );
  }

  // 4. Delegate EVERYTHING else to your awesome ModuleComponent!
  return (
    <ModuleComponent 
      theme={theme} 
      moduleData={moduleData} 
      user={user} 
    />
  );
}