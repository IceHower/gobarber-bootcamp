import express, { Request, Response } from 'express';
import routes from './routes';

const app = express();

app.get('/', (request : Request, response : Response) => response.json({ message: 'Hello World!' }));

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
