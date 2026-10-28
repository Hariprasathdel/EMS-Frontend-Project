// helpers.js

/**
 * Generates initials from a full name for avatars.
 * Example: "Hardik Soni" -> "HS"
 */
export const getInitials = (name) => {
    if (!name) return 'NA';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };
  
  /**
   * Formats a number into a currency string.
   * Example: 5000 -> "$5,000.00"
   */
  export const formatCurrency = (amount, currency = 'USD') => {
    if (isNaN(amount)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  
  /**
   * Truncates long text and adds an ellipsis.
   * Useful for table cells with long "Reasons" or "Descriptions".
   */
  export const truncateText = (text, maxLength = 30) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  /**
   * Calculates the number of days between two dates.
   */
  export const calculateDaysDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both days
    return diffDays > 0 ? diffDays : 1;
  };
  
  /**
   * Validates an email address using Regex.
   */
  export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };