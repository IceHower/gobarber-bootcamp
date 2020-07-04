import { Router } from 'express'; // Importa o Router do express
import appointmentsRouter from './appointments.routes'; //importa a variavel definida no arquivo de rota appointments.
const routes = Router(); // Define uma variavel para inicializar o Router

routes.use('/appointments', appointmentsRouter); // vai chamar os metodos da rota appointments
export default routes;// exporta a variavel routes
