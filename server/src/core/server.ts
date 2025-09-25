import express, { NextFunction, Request, Response } from "express";
import { ConfigService } from "../config/config.service";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

export class Application {
  private app: express.Application;
  private readonly port: number;
  public constructor(private readonly config: ConfigService) {
    this.port = this.config.get<number>("APPLICATION_PORT");
    this.app = this.createApplication();
  }

  private createApplication(): express.Application {
    const app = express();
    app.use(helmet());
    app.use(compression());
    app.use(express.json());
    app.use(cors());

    app.get("/", (req: Request, res: Response) => {
      res.send("HELLO WORLD");
    });

    app.use((req, res) => {
      res.status(404).json({ message: "Not found" });
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.log(err.stack);
      res.status(500).json(err.stack);
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
