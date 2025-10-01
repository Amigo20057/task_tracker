import { ConfigService } from "../config/config.service";
import { PrismaClient, User } from "../generated/prisma";
import prisma from "../prisma.client";

export class UserService {
  private prisma: PrismaClient;
  public constructor(private readonly config: ConfigService) {
    this.prisma = prisma;
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async findUserById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async createUser(user: User): Promise<User> {
    return await this.prisma.user.create({ data: user });
  }

  public async profile(id: string): Promise<Omit<User, "password">> {
    const foundedUser = await this.findUserById(id);
    if (!foundedUser) throw new Error("User not found");
    const { password, ...user } = foundedUser;
    return user;
  }
}
