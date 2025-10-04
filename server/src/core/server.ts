import express, { NextFunction, request, Request, Response } from "express";
import { ConfigService } from "../config/config.service";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { authMiddleware } from "../utils/auth.middleware";
import { UserController } from "../controllers/user.controller";
import { BoardService } from "../services/board.service";
import { BoardController } from "../controllers/board.controller";

export class Application {
  private app: express.Application;
  private port: number;
  private userService: UserService;
  private authService: AuthService;
  private boardService: BoardService;
  private authController: AuthController;
  private userController: UserController;
  private boardController: BoardController;
  private authRouter: express.Router;
  private userRouter: express.Router;
  private boardRouter: express.Router;

  public constructor(private readonly config: ConfigService) {
    this.port = this.config.get<number>("APPLICATION_PORT");
    this.authRouter = express.Router();
    this.userRouter = express.Router();
    this.boardRouter = express.Router();
    this.userService = new UserService(this.config);
    this.authService = new AuthService(this.userService, this.config);
    this.boardService = new BoardService();
    this.authController = new AuthController(this.authService, this.config);
    this.userController = new UserController(this.userService);
    this.boardController = new BoardController(this.boardService);
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
        origin: [this.config.get<string>("CLIENT_URL")],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
      })
    );

    this.authRouter.post("/register", this.authController.register);
    this.authRouter.post("/login", this.authController.login);
    this.authRouter.post("/logout", this.authController.logout);

    this.userRouter.get(
      "/profile",
      authMiddleware(this.config),
      this.userController.profile
    );

    this.boardRouter.post(
      "/create",
      authMiddleware(this.config),
      this.boardController.create
    );
    this.boardRouter.delete(
      "/delete/:boardId",
      authMiddleware(this.config),
      this.boardController.deleteBoard
    );
    this.boardRouter.get(
      "/by-id/:boardId",
      authMiddleware(this.config),
      this.boardController.findBoardById
    );
    this.boardRouter.get(
      "/",
      authMiddleware(this.config),
      this.boardController.findBoardsByUserId
    );
    this.boardRouter.post(
      "/section/create",
      authMiddleware(this.config),
      this.boardController.createSection
    );
    this.boardRouter.delete(
      "/section/delete",
      authMiddleware(this.config),
      this.boardController.deleteSection
    );
    this.boardRouter.post(
      "/section/task/create",
      authMiddleware(this.config),
      this.boardController.createTask
    );

    app.use("/auth", this.authRouter);
    app.use("/users", this.userRouter);
    app.use("/boards", this.boardRouter);

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
