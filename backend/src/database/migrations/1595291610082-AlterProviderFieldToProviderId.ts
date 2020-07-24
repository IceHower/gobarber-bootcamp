import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey, Table} from "typeorm";

export default class AlterProviderFieldToProviderId1595291610082 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider_id',
            type: 'uuid',
            //  ESTRATEGIA DE CASCADE
            isNullable: true, // botamos true para caso um dia o usuario seja apagado, nao se perca os logs das consultas que ele teve

        }));
        //Especificamos a foreign key
        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'AppointmentProvider', // Define um nome para o foreign key
            columnNames: ['provider_id'], // coluna da tabela appointments que vai ser uma foreign key
            referencedColumnNames: ['id'], // coluna que referencia a foreing key
            referencedTableName: 'users', // tabela que referencia a foreign key
            onDelete: 'SET NULL', // Isso vai setar null o campo caso o usuario seja deletado
            onUpdate: 'CASCADE', // Isso caso o id seja alterado, vai alterar o id em todos os relacionamentos feitos.
        }));
    }
    // metodo down reverte tudo que foi feito no metodo up
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider'); // Deleta a foreign key
        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider',
            type: 'varchar'
        }));
    }

}
