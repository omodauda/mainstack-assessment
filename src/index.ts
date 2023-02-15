import dotenv from 'dotenv';
import App from './app';

import ProductRoute from './routes/product.route';

dotenv.config();


const app = new App([
  new ProductRoute()
]);

app.listen();
app.connectDatabase();