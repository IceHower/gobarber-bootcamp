import Appointment from '../models/Appointment';
import  { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * Recebimento das informações
 * Tratativa de erros/excessões
 * Acesso ao repositório
 */

 interface RequestDTO { //DTO dos dados recebidos
    provider: string,
    date: Date,
 }


class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository; //Cria uma variavel privada para armazenar os dados recebidos do constructor.
    //Passamos o nosso appointmentsRepository como parametro, e definimos o tipo dele como uma instancia da Classe de AppointmentsRepository
    //quando desejamos que um parametro seja do tipo de uma instancia de uma classe utilizamos esse formato
    //Recebe todas dependencias através do constructor
    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository; // Armazena os dados recebidos do constructor na variavel privada.

    }
    public execute({date, provider} : RequestDTO): Appointment {
        const appointmentDate = startOfHour(date); //Seta o agendademento de hora em hora. // Aqui é uma regra de negócio.
        const appointmentsRepository = new AppointmentsRepository(); //Instancia a classe de AppointmentsRepository

        const isDateUsed = this.appointmentsRepository.isUsed(appointmentDate); //Passa o parsedDate para a função isUsed no appointmentRepository.
        if(isDateUsed) { //Se o isDateUsed retornar um objeto ele da um throw em um erro.
         throw Error('This appointment is already booked');
        }

         const appointment = this.appointmentsRepository.create({
         provider,
         date: appointmentDate
        }); //Usa o metodo create da appointmentsRepository passando o provider e a parsedDate.

        return appointment;
    }
}


export default CreateAppointmentService;
