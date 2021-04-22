import { getCustomRepository, Repository } from "typeorm"
import {SettingsRepo} from "../repositories/SettingsRepo"
import {Setting} from "../entities/Setting"

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {

    private settingsRepo: Repository<Setting>;

    constructor() {
        this.settingsRepo = getCustomRepository(SettingsRepo);
    }

    /*/*https://typeorm.io/#/custom-repository*/
    async create( { chat, username } : ISettingsCreate ){

        //Select * from settings where username = "username" limit 1;
        const userAlreadyExists = await this.settingsRepo.findOne({
            username
        });

        if(userAlreadyExists) {
            throw new Error("User already exists!");
        }

        const settings = this.settingsRepo.create({
            chat,
            username,
        });

        await this.settingsRepo.save(settings);

        return settings;
    }
}

export { SettingsService }