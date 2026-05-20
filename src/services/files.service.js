import { supabase } from '../supabaseClient';

const BUCKET_NAME = 'Training Modules';

const filesService = {
  /**
   * Generates a public URL for a given file path in Supabase storage.
   * @param {string} filePath - The path from your module constants (e.g., "/Training Modules/...")
   * @returns {string} The full Supabase public URL
   */
  getFileUrl: (filePath) => {
    if (!filePath) return "";
    
    // 1. Remove leading slash if it exists
    let cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
    
    // 2. THE FIX: If your bucket doesn't have the "Training Modules" parent folder, 
    // we strip it out of the string so it matches Supabase perfectly.
    if (cleanPath.startsWith('Training Modules/')) {
      cleanPath = cleanPath.replace('Training Modules/', '');
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(cleanPath);
    return data.publicUrl;
  },

  // Fetch a list of files in a specific folder
  getModuleResources: async (folderPath) => {
    const cleanPath = folderPath.startsWith('/') ? folderPath.slice(1) : folderPath;
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list(cleanPath);
    
    if (error) {
      console.error("Error fetching resources:", error);
      return { data: [], error };
    }
    return { data };
  },

  // Upload a file to Supabase
  uploadFile: async (file, path) => {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(`${path}/${file.name}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error("Upload error:", error);
      return { success: false, error };
    }
    return { success: true, data };
  },

  // Delete a file from Supabase
  deleteFile: async (filePath) => {
    const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
    const { data, error } = await supabase.storage.from(BUCKET_NAME).remove([cleanPath]);

    if (error) {
      console.error("Delete error:", error);
      return { success: false, error };
    }
    return { success: true, data };
  }
};

export default filesService;