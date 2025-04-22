/**
 * Formats the current date and time in the Israeli format
 * @param {Date} date - Optional date object, defaults to current date and time
 * @returns {string} Formatted date string in DD/MM/YY HH:MM format
 */
export const formatDate = (date = new Date()) => {
  // Ensure we're working with a Date object
  const d = date instanceof Date ? date : new Date(date);
  
  // Check if the date is valid
  if (isNaN(d.getTime())) {
    console.error('Invalid date provided to formatDate:', date);
    return 'תאריך לא תקין';
  }
  
  // Format with zero-padding where needed
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear().toString().slice(-2);
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

/**
 * Formats a date relative to now (e.g., "2 hours ago")
 * @param {Date|string} date - The date to format
 * @returns {string} Human-readable relative time
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const d = date instanceof Date ? date : new Date(date);
  
  // Check if the date is valid
  if (isNaN(d.getTime())) {
    console.error('Invalid date provided to formatRelativeTime:', date);
    return 'זמן לא תקין';
  }
  
  const diffInSeconds = Math.floor((now - d) / 1000);
  
  if (diffInSeconds < 60) {
    return 'עכשיו';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `לפני ${diffInMinutes} דקות`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `לפני ${diffInHours} שעות`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `לפני ${diffInDays} ימים`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `לפני ${diffInMonths} חודשים`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `לפני ${diffInYears} שנים`;
};

/**
 * Parse a date string in the format "DD/MM/YY HH:MM"
 * @param {string} dateString - Date string in Israeli format
 * @returns {Date} JavaScript Date object
 */
export const parseDate = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    console.error('Invalid date string provided to parseDate:', dateString);
    return new Date();
  }
  
  try {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/').map(num => parseInt(num, 10));
    const [hours, minutes] = timePart.split(':').map(num => parseInt(num, 10));
    
    // Note: month is 0-indexed in JavaScript Date
    return new Date(2000 + year, month - 1, day, hours, minutes);
  } catch (error) {
    console.error('Error parsing date:', error);
    return new Date();
  }
};