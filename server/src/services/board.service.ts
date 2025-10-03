import { Board, PrismaClient } from "../generated/prisma";
import prisma from "../prisma.client";

export class BoardService {
  private prisma: PrismaClient;
  public constructor() {
    this.prisma = prisma;
  }

  public async findBoardById(
    id: string,
    userId: string
  ): Promise<Board | null> {
    return await this.prisma.board.findFirst({
      where: {
        id,
        userCreatorId: userId,
      },
      include: {
        sections: {
          include: {
            tasks: {
              include: {
                assigned: true,
                creator: true,
              },
            },
          },
        },
      },
    });
  }

  public async findBoardsByUserId(userId: string): Promise<Board[] | null> {
    return await this.prisma.board.findMany({
      where: {
        userCreatorId: userId,
      },
    });
  }

  public async createBoard(name: string, userId: string): Promise<Board> {
    return await this.prisma.board.create({
      data: {
        name,
        userCreatorId: userId,
      },
    });
  }
}
