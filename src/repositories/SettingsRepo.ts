/**
 * https://typeorm.io/#/working-with-repository
 */

import { EntityRepository, Repository} from "typeorm"
import {Setting} from "../entities/Settings"

@EntityRepository(Setting)
class SettingsRepo extends Repository<Setting> {}

export {SettingsRepo}