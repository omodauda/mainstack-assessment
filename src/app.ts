import express, { Application } from 'express';
import Database from './database/connection';

class App {
  public app: Application;
  public port: string;
  public env: string;
  public database: Database;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.env = process.env.NODE_ENV;
    this.database = new Database();

    this.initializeMiddleware();
  }

  private initializeMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
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