import express from 'express'; // importa o express
import routes from './routes'; // importa a variavel routes exportada da pasta /routes/index.ts

const app = express(); // define uma variavel para inicializar o express
app.use(express.json()); // faz com que possa ler os dados vindo por json.
app.use(routes); // define o .use na variavel routes

app.listen(3333, () => { // inicializa o servidor na porta 3333
  console.log('Server started on port 3333');
});
