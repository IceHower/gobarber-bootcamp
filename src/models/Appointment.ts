import { uuid } from 'uuidv4'; // importamos a função uuid do uuidv4
//Criamos a classe Appointment para dividirmos as responsabilidades, aqui ela recebera tudo que for relacionado aos cadastro de Appointments
class Appointment {
    //Definimos o tipos das variaves que o constructor ira receber
    id: string;

    provider: string;

    date: Date;
    //Desestruturamos os parametros para ter uma melhor vizualização
    // O Omit serve para definir o tipos do parametro e qual variavel se deseja omitir deste tipo
    //EX: Omit<TipoDoParametro, 'variavel que se deseja omitir'>
    constructor({provider, date} : Omit<Appointment, 'id'>) { //Criamos um constructor para definir quais sao os parametros obrigatorios
        this.id = uuid(); //chama a função uuid para dar um id de forma estática.
        this.provider = provider;
        this.date = date;
    }
}

export default Appointment
