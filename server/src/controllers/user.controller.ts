import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  public constructor(private readonly userService: UserService) {}

  public profile = async (req: Request, res: Response) => {
    try {
      if (!req.user) return res.status(404).json({ message: "Unauthorized" });
      const user = await this.userService.profile((req as any).user.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: "Get Profile failed", error });
    }
  };
}
