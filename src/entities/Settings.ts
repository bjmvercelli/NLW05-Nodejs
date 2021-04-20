/**
 * https://typeorm.io/#/entities
 */

import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm"
import { v4 as uuid} from "uuid"

@Entity("settings")
class Setting{
    
    /*Como o nome das colunas na tabela estão iguais aos nomes abaixo (id, username,...) não precisamos passar parametro como fizemos acima no @Entity*/
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    chat: boolean;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if (!this.id){
            this.id = uuid();
        }
    }
}

export { Setting }