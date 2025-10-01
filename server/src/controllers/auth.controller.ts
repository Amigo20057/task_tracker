import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";

export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  public register = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.register(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: "Registration failed", error });
    }
  };

  public login = async (req: Request, res: Response) => {
    try{
        
    }
  };
}
