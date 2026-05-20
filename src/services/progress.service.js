// src/services/progress.service.js

const progressService = {
  // Fetch progress from localStorage
  getModuleProgress: async (moduleId) => {
    try {
      const storedProgress = localStorage.getItem(`kafs_module_progress_${moduleId}`);
      
      if (storedProgress) {
        return { data: JSON.parse(storedProgress) };
      }

      // Default state if nothing is stored yet
      return { 
        data: { 
          status: 'not_started', 
          progressPercentage: 0 
        } 
      };
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return { data: { status: 'not_started', progressPercentage: 0 } };
    }
  },

  // Update progress and save to localStorage
  updateProgress: async (moduleId, data) => {
    try {
      console.log(`Mock progress update for module ${moduleId}:`, data);
      
      // Fetch existing data to merge with the new updates
      const storedProgress = localStorage.getItem(`kafs_module_progress_${moduleId}`);
      let currentData = storedProgress ? JSON.parse(storedProgress) : { status: 'not_started', progressPercentage: 0 };
      
      // Merge new data
      const updatedData = { ...currentData, ...data };
      
      // Save back to local storage
      localStorage.setItem(`kafs_module_progress_${moduleId}`, JSON.stringify(updatedData));
      
      return { data: { success: true, ...updatedData } };
    } catch (error) {
      console.error("Error saving to localStorage", error);
      return { data: { success: false, error: error.message } };
    }
  }
};

export default progressService;