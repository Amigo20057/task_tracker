import { PrismaClient, User } from "../generated/prisma";
import prisma from "../prisma.client";
import { UserService } from "./user.service";

export class AuthService {
  private prisma: PrismaClient;
  public constructor(private readonly userService: UserService) {
    this.prisma = prisma;
  }

  private generateToken(): string {}

  public async register(user: User) {
    const usersExists = await this.userService.
  }
}
