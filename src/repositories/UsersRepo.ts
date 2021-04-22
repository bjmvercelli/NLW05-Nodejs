import { EntityRepository, Repository } from "typeorm";
import {User} from "../entities/User"

@EntityRepository(User)
class UsersRepo extends Repository<User>{}

export {UsersRepo}