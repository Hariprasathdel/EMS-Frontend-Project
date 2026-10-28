// timeFormatters.js

/**
 * Converts 24-hour time (HH:MM:SS) to 12-hour time (h:mmAM/PM).
 * Matches the format in your image: "9:30AM", "12:00AM"
 */
export const formatTimeTo12Hour = (timeString) => {
    if (!timeString || timeString === '-') return '-';
    
    // Handle cases where it's already somewhat formatted or just a date-time string
    const date = new Date(`1970-01-01T${timeString}Z`); // Append Z to avoid timezone shifts
    if (isNaN(date.getTime())) return timeString;
  
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    // To match image exactly (e.g., "9:30AM" without space)
    return `${hours}:${minutes}${ampm}`;
  };
  
  /**
   * Calculates total hours worked between Punch-In and Punch-Out.
   * Returns decimal hours (e.g., 8.5 hours).
   */
  export const calculateWorkedHours = (punchIn, punchOut) => {
    if (!punchIn || !punchOut || punchIn === '-' || punchOut === '-') return 0;
  
    const start = new Date(`1970-01-01T${punchIn}Z`);
    const end = new Date(`1970-01-01T${punchOut}Z`);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  
    const diffMs = end - start;
    const diffHours = diffMs / (1000 * 60 * 60);
    
    return diffHours > 0 ? parseFloat(diffHours.toFixed(2)) : 0;
  };
  
  /**
   * Formats decimal hours into a readable string.
   * Example: 2.5 -> "2h 30m"
   */
  export const formatDuration = (decimalHours) => {
    if (!decimalHours || decimalHours === 0) return '0m';
    
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    
    let result = '';
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m`;
    
    return result.trim();
  };