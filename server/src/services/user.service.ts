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

  public async createUser(user: User): Promise<User> {
    return await this.prisma.user.create({ data: user });
  }
}
