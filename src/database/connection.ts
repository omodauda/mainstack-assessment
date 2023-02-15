import mongoose, { Mongoose } from 'mongoose';
import seed from './seed';

class Database {
  private connection: Mongoose;
  public url: string;

  constructor() {
    this.connection = mongoose;
    this.url = process.env.DATABASE_URL;
  }

  public connect(): void {
    this.connection.set('strictQuery', false);
    this.connection.connect(this.url).then(() => {
      console.log('Database connected');
      seed();
    })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Database;