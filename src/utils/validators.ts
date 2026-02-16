export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (password.length < 8) errors.push('Password must be at least 8 characters long');
  if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('Password must contain at least one number');
  return { valid: errors.length === 0, errors };
};

export const validatePhoneNumber = (phone: string): boolean => {
  return /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
};

export const validateEmployeeId = (id: string): boolean => id.trim().length > 0;

export const validateDateRange = (startDate: Date, endDate: Date): boolean => startDate <= endDate;

export const validateLeaveReason = (reason: string): boolean =>
  reason.trim().length >= 5 && reason.trim().length <= 500;

export const getPasswordStrength = (password: string): 'weak' | 'moderate' | 'strong' => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  if (strength <= 2) return 'weak';
  if (strength <= 3) return 'moderate';
  return 'strong';
};
