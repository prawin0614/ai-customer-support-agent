/**
 * Authentication utilities for admin panel
 */

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  pin: '1234',
};

export function validateAdminLogin(username: string, pin: string): boolean {
  return username === ADMIN_CREDENTIALS.username && pin === ADMIN_CREDENTIALS.pin;
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_auth_token');
}

export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_auth_token', token);
  }
}

export function clearAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_auth_token');
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('admin_auth_token');
  return token === 'admin-authenticated-token';
}

export function generateAuthToken(): string {
  return 'admin-authenticated-token';
}
