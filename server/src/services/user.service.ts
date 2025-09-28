import { ConfigService } from "../config/config.service";
import { PrismaClient, User } from "../generated/prisma";
import prisma from "../prisma.client";

export class UserService {
  private prisma: PrismaClient;
  public constructor(private readonly config: ConfigService) {
    this.prisma = prisma;
  }

  public async createUser(user: User): Promise<User> {
    return await this.prisma.user.create({ data: user });
  }
}
