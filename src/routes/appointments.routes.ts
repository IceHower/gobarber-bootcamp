import { Router, Response, Request } from 'express'; // Importa o router, Response e request para definir os tipos do paramentro
import {uuid} from 'uuidv4';
import { startOfHour, parseISO, isEqual} from 'date-fns'; //Importa as funções startOfHour, parseISO e isEqual do date-fns

//A função parseISO vai converter uma string para o formato date do js
//A funçao startOfHour vai pega o começo da hora de uma data
interface Appointment  {
    id: string,
    provider: string,
    date: Date,
}

const appointmentsRouter = Router(); // define uma variavel para inicializar o router
const appointments: Appointment[] = []; // define que a variavel e um array da interface de appointment
appointmentsRouter.post('/', (request : Request, response : Response) => { // Metodo get da rota appointments que retorna um Json
    const { provider, date } = request.body; // Pega o nome do provider e a data do body da aplicação
    const parsedDate = startOfHour(parseISO(date)); //pega a data transforma em Date do js e seta pra ser a hora exata.
    const appointment = { // cria uma variavel pra armazenar os recebido do body
        id: uuid(),
        provider,
        date: parsedDate
    }

    const isDateUsed = appointments.find(appointement => isEqual(parsedDate, appointment.date)); //Percorre todo array e executa a comparação isEqual

    if(isDateUsed) { //Se o isDateUsed for true ele retorna um erro.
        return response.status(400).json({message: 'This appointment is already booked'});
    }

    appointments.push(appointment); // inseri as informações dentro do array

    return response.json(appointment); // retorna um json com as informações cadastradas
})

export default appointmentsRouter; // exporta a variavel
