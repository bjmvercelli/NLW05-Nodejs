import { getCustomRepository, Repository } from "typeorm"
import { Connection } from "../entities/Connection"
import { ConnectionsRepo } from "../repositories/ConnectionsRepo"


interface IConnectionCreate{
    socket_id: string,
    user_id: string,
    admin_id?: string,
    id?: string
}

class ConnectionsService {
    private connectionsRepo: Repository<Connection>

    constructor() {
        this.connectionsRepo = getCustomRepository(ConnectionsRepo);
    }

    async create({socket_id, user_id, admin_id, id} : IConnectionCreate){
        const connection = this.connectionsRepo.create({
            socket_id,
            user_id,
            admin_id,
            id
        });

        await this.connectionsRepo.save(connection);
    }

    async findByUserId(user_id: string){//Método utilizado para verificar se determinado usuário ja tem uma conexao
        const connection = await this.connectionsRepo.findOne({user_id})
    
        return connection;
    }

    async findAllWithoutAdmin(){
        const connections = await this.connectionsRepo.find({
            where: {admin_id: null},
            relations: ["user"],
        });

        return connections;
    }
}

export {ConnectionsService}