/**
 * https://typeorm.io/#/migrations
 * https://typeorm.io/#/using-cli
 */
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSettings1618930691275 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "settings",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "username",
                    type: "varchar",
                },
                {
                    name: "chat",
                    type: "boolean",
                    default: true
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("settings")
    }

}
