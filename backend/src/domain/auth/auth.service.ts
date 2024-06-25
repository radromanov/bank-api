export interface AuthService {
  login: (email: string) => Promise<string>;
  generateToken: () => string;
  verifyToken: () => void;
}
