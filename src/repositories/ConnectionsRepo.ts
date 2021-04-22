import { EntityRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection"

@EntityRepository(Connection)
class ConnectionsRepo extends Repository<Connection> {}

export {ConnectionsRepo}