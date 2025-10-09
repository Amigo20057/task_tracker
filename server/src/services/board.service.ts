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

  public async UpdateSection(
    userId: string,
    boardId: string,
    sectionId: string,
    { ...query }: Partial<Section>
  ): Promise<Section> {
    if (!boardId) throw new Error("Board ID is required");
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
    });
    if (!board || board.userCreatorId !== userId) {
      throw new Error("Not authorized to update this board");
    }
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
    });
    if (!section) {
      throw new Error("Section not found");
    }
    if (section.boardId !== boardId) {
      throw new Error("Section does not belong to this board");
    }
    return await this.prisma.section.update({
      where: {
        id: section.id,
      },
      data: {
        ...query,
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
    boardId: string,
    userId: string
  ): Promise<Task> {
    const board = await this.findBoardById(boardId, userId);
    if (!board) {
      throw new Error("Board not found");
    }
    const section = await this.prisma.section.findUnique({
      where: { id: task.sectionId },
      include: { tasks: true },
    });
    if (!section) {
      throw new Error("Section not found");
    }
    return await this.prisma.task.create({
      data: {
        sectionId: section.id,
        name: task.name,
        taskType: task.taskType,
        deadline: task.deadline,
        priority: task.priority,
        creatorId: userId,
      },
    });
  }

  public async switchTaskAnotherSection(
    userId: string,
    data: {
      boardId: string;
      oldSectionId: string;
      newSectionId: string;
      taskId: string;
    }
  ): Promise<Task> {
    const { boardId, oldSectionId, newSectionId, taskId } = data;
    const board = await this.prisma.board.findFirst({
      where: { id: boardId, userCreatorId: userId },
    });
    if (!board) {
      throw new Error("Board not found or not authorized");
    }
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        sectionId: oldSectionId,
      },
    });
    if (!task) {
      throw new Error("Task not found in the specified old section");
    }
    const newSection = await this.prisma.section.findFirst({
      where: { id: newSectionId, boardId },
    });
    if (!newSection) {
      throw new Error("New section not found in this board");
    }
    const updatedTask = await this.prisma.task.update({
      where: { id: taskId },
      data: { sectionId: newSectionId },
    });
    return updatedTask;
  }

  public async deleteTask(taskId: string, userId: string): Promise<void> {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        creatorId: userId,
      },
    });
    if (!task) throw new Error("Task not found");
    await this.prisma.task.delete({
      where: {
        id: taskId,
        creatorId: userId,
      },
    });
  }

  public async updateTask(
    userId: string,
    boardId: string,
    taskId: string,
    { ...query }: Partial<Task>
  ): Promise<Task> {
    if (!boardId) throw new Error("Board ID is required");
    const board = await this.prisma.board.findUnique({
      where: { id: boardId },
      include: {
        sections: {
          select: { id: true },
        },
      },
    });
    if (!board || board.userCreatorId !== userId) {
      throw new Error("Not authorized to update this board");
    }
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      select: { id: true, sectionId: true },
    });
    if (!task) {
      throw new Error("Task not found");
    }
    const sectionIds = board.sections.map((s) => s.id);
    if (!sectionIds.includes(task.sectionId)) {
      throw new Error("Task does not belong to this board");
    }
    return await this.prisma.task.update({
      where: { id: task.id },
      data: { ...query },
    });
  }
}
