import { Request, Response } from "express";
import { BoardService } from "../services/board.service";

export class BoardController {
  public constructor(private readonly boardService: BoardService) {}

  public create = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(404).json({ message: "Unauthorized" });
      const { name } = req.body;
      const board = await this.boardService.createBoard(name, req.user.id);
      res.status(201).json(board);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: "Create board failed", error: message });
    }
  };

  public deleteBoard = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(404).json({ message: "Unauthorized" });
      const boardId = req.params.boardId;
      const board = await this.boardService.deleteBoard(boardId, req.user.id);
      res.status(200).json(board);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: "Delete board failed", error: message });
    }
  };

  public updateBoard = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(404).json({ message: "Unauthorized" });
      const { boardId } = req.body;
      const updatedBoard = await this.boardService.updateBoard(
        req.user.id,
        boardId,
        req.query
      );
      res.status(200).json(updatedBoard);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: "Update board failed", error: message });
    }
  };

  public updateSection = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(404).json({ message: "Unauthorized" });
      const { boardId, sectionId } = req.body;
      const updatedSection = await this.boardService.UpdateSection(
        req.user.id,
        boardId,
        sectionId,
        req.query
      );
      res.status(200).json(updatedSection);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: "Update section failed", error: message });
    }
  };

  public findBoardsByUserId = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(404).json({ message: "Unauthorized" });
      const boards = await this.boardService.findBoardsByUserId(req.user.id);
      res.status(201).json(boards);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: "Find boards by user id failed", error: message });
    }
  };

  public findBoardById = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(404).json({ message: "Unauthorized" });
      const board = await this.boardService.findBoardById(
        req.params.boardId,
        req.user.id
      );
      res.status(201).json(board);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: "Find board by id failed", error: message });
    }
  };

  public createSection = async (req: Request, res: Response) => {
    try {
      const { boardId, name } = req.body;
      const section = await this.boardService.createSectionForBoard(
        boardId,
        name
      );
      res.status(201).json(section);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: "Create section failed", error: message });
    }
  };

  public deleteSection = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(404).json({ message: "Unauthorized" });
      const { sectionId, boardId } = req.body;
      await this.boardService.deleteSection(req.user.id, sectionId, boardId);
      res.status(200).json({ success: true });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: "Delete section failed", error: message });
    }
  };

  public createTask = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(404).json({ message: "Unauthorized" });
      const task = await this.boardService.createTaskForSection(
        req.body,
        req.params.boardId,
        req.user.id
      );
      res.status(201).json(task);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: "Create task failed", error: message });
    }
  };

  public switchTaskAnotherSection = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(404).json({ message: "Unauthorized" });
      const task = await this.boardService.switchTaskAnotherSection(
        req.user.id,
        req.body
      );
      res.status(200).json(task);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({
        message: "Switch task another section failed",
        error: message,
      });
    }
  };

  public deleteTask = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(404).json({ message: "Unauthorized" });
      await this.boardService.deleteTask(req.params.taskId, req.user.id);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({
        message: "Delete task failed",
        error: message,
      });
    }
  };

  public updateTask = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(404).json({ message: "Unauthorized" });
      const { boardId, taskId } = req.body;
      const updatedTask = await this.boardService.updateTask(
        req.user.id,
        boardId,
        taskId,
        req.query
      );
      res.status(200).json(updatedTask);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({
        message: "Update task failed",
        error: message,
      });
    }
  };
}
