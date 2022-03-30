import 'reflect-metadata';
import { Container, Service } from 'typedi';
import cors from 'cors';
import helmet from 'helmet';
import express, { Express } from 'express';
import { log } from 'debug';

@Service()
export default class BSApp {
  public readonly app: Express;

  constructor() {
    this.app = express();
    this.setupApp();
  }

  private setupApp() {
    this.app.use(helmet());
    this.app.use(cors());

    this.app.get('/health', (req, res) => {
      res.sendStatus(200);
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public setupControllers(controllers: Array<Function>) {
    controllers.forEach((controller) => Container.get(controller));
  }

  public start() {
    const listen = process.env.LISTEN ?? '127.0.0.1:4000';
    const segments = listen.split(':');
    const port = segments.length > 1 ? segments[1] : segments[0];
    const host = segments.length > 1 ? segments[0] : '127.0.0.1';

    this.app.listen(Number(port), host, () => {
      log('Server listening at %s', process.env.LISTEN);
    });
  }
}
