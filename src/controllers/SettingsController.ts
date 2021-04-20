import { Request, Response} from "express"
import {getCustomRepository} from "typeorm"
import {SettingsRepo} from "../repositories/SettingsRepo"

class SettingsController {
    async create(request: Request, response: Response){
        const {chat, username} = request.body;
        /*https://typeorm.io/#/custom-repository*/
        const settingsRepo = getCustomRepository(SettingsRepo);

        const settings = settingsRepo.create({
            chat,
            username,
        });

        await settingsRepo.save(settings);

        return response.json(settings);
    }
}

export { SettingsController }