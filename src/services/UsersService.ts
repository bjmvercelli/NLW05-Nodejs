import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepo } from "../repositories/UsersRepo";


class UsersService {
    
    private usersRepo: Repository<User>;

    constructor() {
        this.usersRepo = getCustomRepository(UsersRepo);
    }

    //Nesse caso, como estamos lidando apenas com uma informação (email), não há necessidade da interface
    async create(email: string) {
         
        //Verificar se o usuario existe
        const userExists = await this.usersRepo.findOne({
            email
        })

        //Se exisir, retornar informações do user
        if (userExists){
            return userExists; 
        }
        
        //https://typeorm.io/#/repository-api
        const user = this.usersRepo.create({ //cria uma nova instancia de "User" recebendo propriedades a serem escritas nela (email no caso)
            email
        });

        await this.usersRepo.save(user);
        //Se não existir, salvar no BD e retornar

        return user;
    }

    async findByEmail(email: string){
        const user = await this.usersRepo.findOne({ email });

        return user;
    }
}

export {UsersService}