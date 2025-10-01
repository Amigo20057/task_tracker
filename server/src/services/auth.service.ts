import { hash, verify } from "argon2";
import { User } from "../generated/prisma";
import { UserService } from "./user.service";
import jwt from "jsonwebtoken";
import { ConfigService } from "../config/config.service";

export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly config: ConfigService
  ) {}

  private generateToken(user: Pick<User, "id" | "email">): string {
    return jwt.sign(user, this.config.get<string>("JWT_SECRET"), {
      expiresIn: "1h",
    });
  }

  public async register(
    user: User
  ): Promise<Omit<User, "password"> & { token: string }> {
    const usersExists = await this.userService.findUserByEmail(user.email);
    if (usersExists) throw new Error("User exists");
    user.password = await hash(user.password);
    const newUser = await this.userService.createUser(user);
    const token = this.generateToken({ id: newUser.id, email: newUser.email });
    const { password, ...userWithoutPassword } = newUser;
    return {
      ...userWithoutPassword,
      token,
    };
  }

  public async login(
    user: Pick<User, "email" | "password">
  ): Promise<Omit<User, "password"> & { token: string }> {
    const existingUser = await this.userService.findUserByEmail(user.email);
    if (!existingUser) throw new Error("User not exists");
    const isPasswordValid = await verify(existingUser.password, user.password);
    if (!isPasswordValid) throw new Error("Wrong data");
    const token = this.generateToken({
      id: existingUser.id,
      email: existingUser.email,
    });
    const { password, ...userWithoutPassword } = existingUser;
    return {
      ...userWithoutPassword,
      token,
    };
  }
}
