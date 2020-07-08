import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';
// Este repositorio vai ficar responsavel por ler, armazenar, excluir e editar toda informação que for de appointment.
interface CreateAppointmentDTO { //Criamos um interface para usar o conceito de DTO
    provider: string,
    date: Date,
}
class AppointmentsRepository {
    private appointments: Appointment[]; // Private define que a variavel nao é acessivel por fora da classe.

    constructor() {
        this.appointments = []; // Inicializa a variavel como um array vazio.
    }

    public isUsed(date: Date): Appointment | null {
        const isDateUsed = this.appointments.find(appointment => isEqual(date, appointment.date)); //Percorre todo array e executa a comparação isEqual

        return isDateUsed || null; //se tiver um isUsedDate ele vai retornar, caso o contrario ele retorna null.
    }
    //especifica que o tipo de retorno vai ser igual ao objeto do model de Appointment, e desestrutura os campos providos na função.
    //E ainda especifica que os parametros na função ao do Tipo da interface criada lá em cima
    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });

        this.appointments.push(appointment); // cria uma variavel pra armazenar os recebido do body e instancia na classe de Appointment.

        return appointment;

    }

    public list(): Appointment[] {
        return this.appointments;
    }
}


export default AppointmentsRepository;
