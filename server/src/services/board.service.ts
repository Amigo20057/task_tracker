import {
  Board,
  Priority,
  PrismaClient,
  Section,
  Task,
  TaskType,
  User,
} from "../generated/prisma";
import prisma from "../prisma.client";

export class BoardService {
  private prisma: PrismaClient;
  public constructor() {
    this.prisma = prisma;
  }

  private async checkUserAccess(boardId: string, userId: string) {
    const board = await this.prisma.board.findFirst({
      where: {
        id: boardId,
        OR: [{ userCreatorId: userId }, { users: { some: { id: userId } } }],
      },
    });
    if (!board) throw new Error("Not authorized or board not found");
    return board;
  }

  public async findBoardById(
    id: string,
    userId: string
  ): Promise<Board | null> {
    return await this.prisma.board.findFirst({
      where: {
        id,
        OR: [{ userCreatorId: userId }, { users: { some: { id: userId } } }],
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
        users: true,
      },
    });
  }

  public async findBoardsByUserId(userId: string): Promise<Board[] | null> {
    return await this.prisma.board.findMany({
      where: {
        OR: [{ userCreatorId: userId }, { users: { some: { id: userId } } }],
      },
      include: { users: true },
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
    name: string,
    userId: string
  ): Promise<Section> {
    await this.checkUserAccess(boardId, userId);
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
      where: { id: boardId, userCreatorId: userId },
    });
    if (!board) throw new Error("Not authorized to delete this section");

    await this.prisma.section.delete({ where: { id: sectionId } });
  }

  public async createTaskForSection(
    task: {
      sectionId: string;
      name: string;
      taskType: TaskType;
      deadline: Date;
      priority: Priority;
    },
    boardId: string,
    userId: string
  ): Promise<Task> {
    await this.checkUserAccess(boardId, userId);
    return await this.prisma.task.create({
      data: {
        sectionId: task.sectionId,
        name: task.name,
        taskType: task.taskType,
        deadline: task.deadline,
        priority: task.priority,
        creatorId: userId,
        assigned: {
          connect: [{ id: userId }],
        },
      },
    });
  }

  public async createInviteLink(
    boardId: string,
    userId: string
  ): Promise<{ inviteUrl: string }> {
    const board = await this.checkUserAccess(boardId, userId); // проверка доступа
    const invite = await this.prisma.boardInvite.create({
      data: {
        boardId: board.id,
        createdById: userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    return { inviteUrl: `${process.env.CLIENT_URL}/invite/${invite.id}` };
  }

  public async joinBoardByInvite(
    inviteId: string,
    userId: string
  ): Promise<Board> {
    const invite = await this.prisma.boardInvite.findUnique({
      where: { id: inviteId },
      include: { board: true },
    });
    if (!invite || !invite.isActive)
      throw new Error("Invite not found or expired");
    if (invite.expiresAt < new Date()) throw new Error("Invite expired");
    await this.prisma.board.update({
      where: { id: invite.boardId },
      data: {
        users: {
          connect: { id: userId },
        },
      },
    });
    await this.prisma.boardInvite.delete({ where: { id: inviteId } });
    return invite.board;
  }
}
