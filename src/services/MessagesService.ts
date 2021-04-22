import { getCustomRepository, Repository } from "typeorm"
import {MessagesRepo} from "../repositories/MessagesRepo"
import { Message } from "../entities/Message"

interface IMessageCreate{
    admin_id?: string, //O ponto de interrogação infere que o atributo é opicional
    text: string,
    user_id: string
}

class MessagesService{

    private messagesRepo: Repository<Message>

    constructor() {
        this.messagesRepo = getCustomRepository(MessagesRepo);
    }

    async create({admin_id, text, user_id} : IMessageCreate){

        const message = this.messagesRepo.create({ //cria uma nova instancia de "Messages"...
            admin_id,
            text,
            user_id,
        });
        
        await this.messagesRepo.save(message);

        return message;
    }
    async listByUser(user_id: string){

        //https://orkhan.gitbook.io/typeorm/docs/find-options
        const list = await this.messagesRepo.find({ //Traz a lista de mensagens do usuario
            where: {user_id},
            relations: ["user"] //Mesmo nome que atribuimos quando estabelecemos a relação na entidade ("user: User;"). Assim podemos pegar os atributos do User.
        });

        return list;
    }
}

export {MessagesService}