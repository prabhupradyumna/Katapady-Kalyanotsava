
export type AdminRole = 'PARKING' | 'LOST_FOUND' | null;

interface AuthState {
  role: AdminRole;
  token: string | null;
}

const STORAGE_KEY = "admin_auth_session";

export const auth = {
  login: (username: string, password: string): AdminRole => {
    if (username === 'admin') {
      if (password === 'Katapady2026') {
        const state: AuthState = { role: 'PARKING', token: 'simulated-jwt-parking' };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        return 'PARKING';
      }
      if (password === 'Srinivasa2026') {
        const state: AuthState = { role: 'LOST_FOUND', token: 'simulated-jwt-lf' };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        return 'LOST_FOUND';
      }
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getSession: (): AuthState => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { role: null, token: null };
  },

  isAuthorized: (requiredRole?: AdminRole): boolean => {
    const session = auth.getSession();
    if (!session.role) return false;
    if (requiredRole && session.role !== requiredRole) return false;
    return true;
  }
};
