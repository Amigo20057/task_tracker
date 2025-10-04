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

  public async updateBoard(
    userId: string,
    id: string,
    { ...query }: Partial<Board>
  ): Promise<Board> {
    if (!id) throw new Error("Board ID is required");
    const board = await this.prisma.board.findUnique({
      where: { id },
    });
    if (!board || board.userCreatorId !== userId) {
      throw new Error("Not authorized to update this board");
    }
    return await this.prisma.board.update({
      where: { id },
      data: { ...query },
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

  public async deleteSection(
    userId: string,
    sectionId: string,
    boardId: string
  ): Promise<void> {
    const board = await this.prisma.board.findFirst({
      where: {
        id: boardId,
        userCreatorId: userId,
      },
    });
    if (!board) {
      throw new Error("Board not found");
    }
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: { tasks: true },
    });
    if (!section) {
      throw new Error("Section not found");
    }
    await this.prisma.section.delete({
      where: { id: section.id },
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
