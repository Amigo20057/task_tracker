import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ConfigService } from "../config/config.service";

export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService
  ) {}

  public register = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.register(req.body);
      res.cookie("token", user.token, {
        httpOnly: true,
        secure: this.config.get<string>("NODE_ENV") === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      });
      return res.status(201).json({ user });
    } catch (error) {
      return res.status(400).json({ message: "Registration failed", error });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.login(req.body);
      res.cookie("token", user.token, {
        httpOnly: true,
        secure: this.config.get<string>("NODE_ENV") === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      });
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ message: "Login failed", error });
    }
  };

  public logout = (req: Request, res: Response) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: this.config.get<string>("NODE_ENV") === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  };
}
