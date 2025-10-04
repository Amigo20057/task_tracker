import {
  Board,
  Priority,
  PrismaClient,
  Section,
  Task,
  TaskType,
} from "../generated/prisma";
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

  public async deleteBoard(boardId: string, userId: string) {
    return await this.prisma.board.delete({
      where: {
        userCreatorId: userId,
        id: boardId,
      },
    });
  }

  public async createSectionForBoard(
    boardId: string,
    name: string
  ): Promise<Section> {
    return await this.prisma.section.create({
      data: {
        boardId,
        name,
      },
    });
  }

  public async createTaskForSection(
    task: {
      sectionId: string;
      name: string;
      taskType: TaskType;
      deadline: Date;
      priority: Priority;
    },
    userId: string
  ): Promise<Task> {
    return await this.prisma.task.create({
      data: {
        sectionId: task.sectionId,
        name: task.name,
        taskType: task.taskType,
        deadline: task.deadline,
        priority: task.priority,
        creatorId: userId,
      },
    });
  }
}
