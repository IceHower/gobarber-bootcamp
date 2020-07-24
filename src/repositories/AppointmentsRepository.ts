import Appointment from '../models/Appointment';
import {EntityRepository, Repository} from 'typeorm';
// Este repositorio vai ficar responsavel por ler, armazenar, excluir e editar toda informação que for de appointment.

@EntityRepository(Appointment) //Definimos que a classe é um EntityRepository e passamos o Model de Appointments como parametro.
class AppointmentsRepository extends Repository<Appointment> { //Define a tipagem do Repository como sendo o Model Appointment

    public async isUsed(date: Date): Promise<Appointment | null> { // Define o tipo da função assincrona sendo uma Promise que vai retornar um appointment ou null.
        const findAppointment = await this.findOne({
            where: {date},
        });
        return findAppointment || null; //se tiver um isUsedDate ele vai retornar, caso o contrario ele retorna null.
    }
}


export default AppointmentsRepository;
