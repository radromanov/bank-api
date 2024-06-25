import { FindUserUseCase } from "@application/user";
import { AuthService } from "@domain/auth";

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
