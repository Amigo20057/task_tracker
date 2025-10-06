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

  public inviteUserToBoard = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(404).json({ message: "Unauthorized" });
      const { boardId, invitedUserId } = req.body;
      await this.boardService.inviteUserToBoard(
        boardId,
        invitedUserId,
        req.user.id
      );
      res.status(200).json({ success: true });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({ message: "Invite user to board failed", error: message });
    }
  };

  public getInvitedUsers = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(404).json({ message: "Unauthorized" });
      const users = await this.boardService.getInvitedUsers(
        req.user.id,
        req.params.id
      );
      res.status(200).json(users);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return res
        .status(500)
        .json({
          message: "Get users assigned to board failed",
          error: message,
        });
    }
  };
}
