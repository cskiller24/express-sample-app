import router from './router';
import express, { Request, Response, ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import { errorHandler } from './Errors/Handler';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});