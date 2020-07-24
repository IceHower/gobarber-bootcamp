import Appointment from '../models/Appointment';
import  { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';

/**
 * Recebimento das informações
 * Tratativa de erros/excessões
 * Acesso ao repositório
 */

 interface RequestDTO { //DTO dos dados recebidos
    provider_id: string,
    date: Date,
 }


class CreateAppointmentService {
    public async execute({date, provider_id} : RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository); // definimos uma variavel que vai receber a função getCustomRepository passando o AppointmentsRepository.
        const appointmentDate = startOfHour(date); //Seta o agendademento de hora em hora. // Aqui é uma regra de negócio.

        const isDateUsed = await appointmentsRepository.isUsed(appointmentDate); //Passa o parsedDate para a função isUsed no appointmentRepository.
        if(isDateUsed) { //Se o isDateUsed retornar um objeto ele da um throw em um erro.
         throw Error('This appointment is already booked');
        }

         const appointment = appointmentsRepository.create({ // O metodo create só cria uma instancia no banco de dados, mas não salva.
         provider_id,
         date: appointmentDate
        }); //Usa o metodo create da appointmentsRepository passando o provider e a parsedDate.

        await appointmentsRepository.save(appointment); // Salva o registro appointment no banco de dados.

        return appointment;
    }
}


export default CreateAppointmentService;
