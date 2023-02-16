import dotenv from 'dotenv';
import express, { Application } from 'express';
import Database from './database/connection';
import Route from './interfaces/route.interface';
import errorMiddleware from './middlewares/error.middleware';

dotenv.config();

class App {
  public app: Application;
  public port: string;
  public env: string;
  public database: Database;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT;
    this.env = process.env.NODE_ENV;
    this.database = new Database();

    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorhandling();
  }

  private initializeMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private initializeRoutes(routes: Route[]): void {
    routes.forEach(route => {
      this.app.use('/api', route.router);
    });
    this.app.get('/api/doc', (req, res) => {
      res.redirect('https://documenter.getpostman.com/view/11291043/2s93CGRb2Y');
    });
  }

  private initializeErrorhandling(): void {
    this.app.use(errorMiddleware);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App is listening on port ${this.port}`);
    });
  }

  public connectDatabase(): void {
    this.database.connect();
  }
}

export default App;