import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn() //Já são decorators especializados nos campos de auditoria na criação e updated.
    created_at: Date;

    @UpdateDateColumn() //Já são decorators especializados nos campos de auditoria na criação e updated.
    updated_at: Date;
}

export default User;
