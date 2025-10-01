import express, { NextFunction, Request, Response } from "express";
import { ConfigService } from "../config/config.service";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

export class Application {
  private app: express.Application;
  private port: number;
  private userService: UserService;
  private authService: AuthService;
  private authController: AuthController;
  private authRouter: express.Router;

  public constructor(private readonly config: ConfigService) {
    this.port = this.config.get<number>("APPLICATION_PORT");
    this.authRouter = express.Router();
    this.userService = new UserService(this.config);
    this.authService = new AuthService(this.userService, this.config);
    this.authController = new AuthController(this.authService, this.config);
    this.app = this.createApplication();
  }

  private createApplication(): express.Application {
    const app = express();
    app.use(cookieParser());
    app.use(helmet());
    app.use(compression());
    app.use(express.json());
    app.use(
      cors({
        origin: this.config.get<string>("CLIENT_URL"),
        credentials: true,
      })
    );

    this.authRouter.post("/register", this.authController.register);
    this.authRouter.post("/login", this.authController.login);
    this.authRouter.post("/logout", this.authController.logout);

    app.use("/auth", this.authRouter);

    app.use((req, res) => {
      res.status(404).json({ message: "Not found" });
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ message: "Internal server error" });
    });

    return app;
  }

  private createServer() {
    this.app.listen(this.port, () => {
      console.log(`server is running on port ${this.port} `);
    });
  }

  public start() {
    this.createServer();
  }
}
