import { Router } from 'express'; // Importa o Router do express
import appointmentsRouter from './appointments.routes'; //importa a variavel definida no arquivo de rota appointments.
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
const routes = Router(); // Define uma variavel para inicializar o Router

routes.use('/appointments', appointmentsRouter); // vai chamar os metodos da rota appointments
routes.use('/users', usersRouter); // vai chamar os metodos da rota user
routes.use('/sessions', sessionsRouter); // vai chamar os metodos da rota session
export default routes;// exporta a variavel routes
