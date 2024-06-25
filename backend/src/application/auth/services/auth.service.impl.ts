import { FindUserUseCase } from "@application/user";

export interface AuthService {
  login: (email: string) => Promise<string>;
  generateToken: () => string;
  verifyToken: () => void;
}

export class AuthServiceImpl implements AuthService {
  constructor(private readonly findUserUseCase: FindUserUseCase) {}

  login = async (email: string): Promise<string> => {
    const user = await this.findUserUseCase.findByEmail(email);

    return "";
  };

  generateToken = (): string => {
    return "";
  };

  verifyToken = () => {
    return;
  };
}
