/**
 * https://typeorm.io/#/working-with-repository
 * https://typeorm.io/#/custom-repository <-------------------- melhor
 */

import { EntityRepository, Repository} from "typeorm"
import {Setting} from "../entities/Setting"

@EntityRepository(Setting)
class SettingsRepo extends Repository<Setting> {}

export {SettingsRepo}