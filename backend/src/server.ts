import express, {Request, Response, NextFunction} from 'express'; // importa o express
import 'express-async-errors'; // importa a biblioteca que permite usarmos o middleware como tratativa de error
import routes from './routes'; // importa a variavel routes exportada da pasta /routes/index.ts
import './database'; //como nao a nenhum export no arquivo de database, pode se importar direto que ele ja vai carregar o arquivo
import 'reflect-metadata';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';
import cors from 'cors'; // Importa cors


const app = express(); // define uma variavel para inicializar o express.
app.use(cors()); // Permite acessar api atraves da interface web.
app.use(express.json()); // faz com que possa ler os dados vindo por json.
app.use(routes); // define o .use na variavel routes
// Fizemos uma rota de forma statica passando os nomes do arquivos que estao na pasta temp
app.use('/files', express.static(uploadConfig.directory));

//A diferença desse middleware para os outros usados para autenticação e uso nas rotas, é que os middlewares
// de error recebem 4 parametros.
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if(err instanceof AppError) { // verifica se o erro e uma instancia da classe AppError, se for significa que o erro é originario dessa classe.
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
},
);

app.listen(3333, () => { // inicializa o servidor na porta 3333
  console.log('Server started on port 3333');
});
