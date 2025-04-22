import { useState, useCallback } from 'react';
import { dataUploadService } from '../services/index';

/**
 * Hook for managing file upload operations
 */
export const useDataUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  /**
   * Uploads files of a specific type
   * @param {FileList} files - The files to upload
   * @param {string} type - The type of files being uploaded (e.g., 'text', 'excel', etc.)
   */
  const uploadFiles = useCallback(async (files, type) => {
    if (!files || files.length === 0) {
      setError('לא נבחרו קבצים להעלאה');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadResult(null);
    
    try {
      // Validate file types based on the selected category
      validateFiles(files, type);
      
      // Proceed with upload
      const result = await dataUploadService.uploadFiles(files, type);
      setUploadResult(result);
      return result;
    } catch (err) {
      console.error('Failed to upload files:', err);
      setError(err.message || 'אירעה שגיאה בהעלאת הקבצים');
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  /**
   * Validates that files match the expected type
   */
  const validateFiles = (files, type) => {
    // Define allowed extensions for each file type
    const allowedExtensions = {
      text: ['.txt', '.doc', '.docx', '.pdf', '.rtf'],
      excel: ['.xls', '.xlsx', '.csv'],
      images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'],
      audio: ['.mp3', '.wav', '.ogg', '.m4a'],
      meetings: ['.mp4', '.webm', '.avi', '.mov'],
      calls: ['.mp3', '.wav', '.ogg'],
      scanned: ['.pdf', '.jpg', '.jpeg', '.png', '.tiff']
      // url and special don't need extension validation
    };
    
    // Skip validation for URL and special types
    if (type === 'url' || type === 'special') return;
    
    // Check if any file has an invalid extension
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.name.toLowerCase();
      const validExtension = (allowedExtensions[type] || []).some(ext => 
        fileName.endsWith(ext)
      );
      
      if (!validExtension) {
        throw new Error(`הקובץ "${file.name}" אינו בפורמט מתאים לקטגוריה שנבחרה.`);
      }
    }
  };

  return {
    uploading,
    error,
    uploadResult,
    uploadFiles
  };
};