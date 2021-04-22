import { EntityRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";

/*Used to declare a class as a custom repository. Custom repository can manage some specific entity or just be generic. Custom repository optionally can extend AbstractRepository, Repository or TreeRepository.*/
@EntityRepository(Message)
class MessagesRepo extends Repository<Message>{}

export {MessagesRepo}