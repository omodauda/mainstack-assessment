import App from './app';
import ProductRoute from './routes/product.route';

const app = new App([
  new ProductRoute()
]);

app.listen();
app.connectDatabase();