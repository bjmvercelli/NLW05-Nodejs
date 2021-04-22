import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMessages1619054588593 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "messages",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "admin_id",
                    type: "uuid",
                    isNullable: true, //Pois quando o usuário inserir seus dados, pode ser que ele não esteja em atendimento com um admin ainda
                },
                {
                    name: "user_id",
                    type: "uuid",
                },
                {
                    name: "text",
                    type: "varchar",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
            ],
            //ForeignKeys são utilizadas resumidamente parar linkar duas tabelas
            //https://typeorm.io/#/migrations <-- aqui mostra como defini-lás, apesar de ser de uma forma diferente
            foreignKeys: [
                {
                    name: "FKUser",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_id"], //referencia o id que vem da tabela "users"
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("messages")
    }

}
