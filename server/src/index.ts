import { ConfigService } from "./config/config.service";
import { Application } from "./core/server";

const app = new Application(new ConfigService());
app.start();
