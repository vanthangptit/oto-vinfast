import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import contactRouter from './modules/v1/contact/routes/contactRoutes';

import { globalErrHandler, middlewareCors } from './middlewares';
//@todo: Double check DB
// import { connectDB } from './database/database';

import conf from './config';
import homeRouter from "./modules/v1/home/routes/homeRoutes";
import productRouter from "./modules/v1/product/routes/productRoutes";

const app: Application = express();
const { port } = conf;
const PORT = port || 9770;

const init = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  //Allow access HTTP
  app.use(middlewareCors);

  //middleware for cookies
  app.use(cookieParser());

  // Setting the page
  app.set('views', __dirname + '/views/pages');
  app.set('view engine', 'ejs');

  // Route Pages
  app.use('/', homeRouter);
  app.use('/san-pham.html', productRouter);

  // Static files
  app.use('/static', express.static(__dirname + '/../dist'));

  // Route APIs
  app.use('/api/v1/contact', contactRouter);

  // Error handlers middleware
  app.use(globalErrHandler);

  // 404 error
  app.use('*', (req: Request, res: Response) => {
    return res.status(404).json({
      message: `${req.originalUrl} - Route not found`,
    });
  });

  //@todo: Double check DB
  // await connectDB();

  app.listen(PORT, function () {
    console.log('Server listen port at ' + PORT);
  });
};

init();
