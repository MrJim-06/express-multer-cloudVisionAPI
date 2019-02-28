import * as express from 'express';
import * as bodyParser from 'body-parser';

import { ImageDetectRoute } from './routes';

class App {
  public app = express.application;
  public imageDetectRoute: ImageDetectRoute = new ImageDetectRoute();

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.imageDetectRoute.routes(this.app);
  }
}

export default new App().app;
