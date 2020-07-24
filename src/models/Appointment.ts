
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm' // Entity no ORM é quando algo vai ser salvo no banco de dados, no caso um model
//Criamos a classe Appointment para dividirmos as responsabilidades, aqui ela recebera tudo que for relacionado aos cadastro de Appointments
import User from './User'
// Colocando esse @Entity('appointments') em cima da classe, basicamente é como se passassemos a classe como parametro para o decorator
// Significa que toda instancia de Appointment, será feita na tabela appointments no banco de dados.
@Entity('appointments')
class Appointment {

    @PrimaryGeneratedColumn('uuid') // Define que é uma chave primaria, que é gerada automaticamente usando o metodo uuid.
    id: string;
    @Column() // define que é uma coluna normal que por padrão se não especificar o tipo, ele irá usar varchar(string).
    provider_id: string;
    
    @ManyToOne(() => User) // Define oq deve retornar, e classificamos Como Muitos Para Um
    @JoinColumn({name: 'provider_id'})
    provider : User;

    @Column('time with time zone')
    date: Date;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment

/**
 * Tipos de Relacionamento
 * Um para Um (one to one)
 * Um para Muitos (one to many)
 * Muitos para Muitos(many to many)
 */
