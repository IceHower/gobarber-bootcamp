import { Router, Response, Request } from 'express'; // Importa o router, Response e request para definir os tipos do paramentro
import { startOfHour, parseISO } from 'date-fns'; //Importa as funções startOfHour, parseISO e isEqual do date-fns
import AppointmentsRepository from '../repositories/AppointmentsRepository'; // importa o repositories
import CreateAppointmentService from '../services/CreateAppointmentService';

//A função parseISO vai converter uma string para o formato date do js
//A funçao startOfHour vai pega o começo da hora de uma data

//Rota deve ta preocupada em receber a requisição, chamar outro arquivo, devolver uma resposta.
//Sempre que tiver algo alem disso, provalvemente devemos abstrair do arquivo de rotas.

const appointmentsRouter = Router(); // define uma variavel para inicializar o router
const appointmentsRepository = new AppointmentsRepository(); //inicializa o AppointmentRepository.



appointmentsRouter.post('/', (request : Request, response : Response) => { // Metodo get da rota appointments que retorna um Json
    try {
        const { provider, date } = request.body; // Pega o nome do provider e a data do body da aplicação.

        const parsedDate = parseISO(date); //pega a data transforma em Date do js. // Aqui só transforma um dado.

        const createAppointment = new CreateAppointmentService(appointmentsRepository); //Passa a instancia  do repository como parametro no constructor do service.
        const appointment = createAppointment.execute({date: parsedDate, provider}); // Destruramos para passar o date e o provider e passamos como parametro no metodo execute do service.
        return response.json(appointment); // retorna um json com as informações cadastradas
    }
    catch (err) {
        return response.status(400).json( { error: err.message });
    }
})

appointmentsRouter.get('/', (request: Request, response: Response) => { // Lista os itens cadastrados
    const appointment = appointmentsRepository.list(); // inicializa uma variavel passando a função list do AppointmentsRepository.

    return response.json(appointment); // retorna um json com o resultado obtido.
});

export default appointmentsRouter; // exporta a variavel
