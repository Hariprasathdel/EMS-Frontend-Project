// constants.js

export const LEAVE_TYPES = [
    'Casual Leave',
    'Sick Leave',
    'Annual Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Unpaid Leave'
  ];
  
  export const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  export const DEPARTMENTS = [
    'IT', 'HR', 'Sales', 'Finance', 'Marketing', 'Operations'
  ];
  
  // Maps status strings to Bootstrap badge color classes
  export const STATUS_COLORS = {
    Active: 'bg-success-subtle text-success',
    Inactive: 'bg-danger-subtle text-danger',
    Pending: 'bg-warning-subtle text-warning',
    Approved: 'bg-success-subtle text-success',
    Rejected: 'bg-danger-subtle text-danger',
    Paid: 'bg-success-subtle text-success',
    'Not Started': 'bg-secondary-subtle text-secondary',
    'In Progress': 'bg-primary-subtle text-primary',
    Completed: 'bg-info-subtle text-info'
  };
  
  export const PAGINATION_LIMITS = [10, 25, 50, 100];
  
  export const DATE_FORMATS = {
    STANDARD: 'YYYY-MM-DD',
    DISPLAY: 'DD/MM/YYYY',
    TIME_12H: 'h:mm A' // e.g., 9:30 AM
  };