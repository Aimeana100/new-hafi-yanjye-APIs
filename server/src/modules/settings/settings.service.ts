import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SettingsRepository } from './settings.repository'
import { UpdateSettingsDto } from './dto/update-settings.dto'
import { REQUEST } from '@nestjs/core'
import { CustomRequest } from '../auth/auth.constants'
import { UserRepository } from '../users/user.repository'

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsRepository)
    private readonly settingsRepository: SettingsRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @Inject(REQUEST) private readonly request: CustomRequest,
  ) {}

  async updateSettings(updateSettingsDto: UpdateSettingsDto) {
    const { id: userId } = this.request.user

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['settings'],
    })

    const settings = user.settings
    if (settings) {
      // return this.settingsRepository.update(settings.id, updateSettingsDto)
      Object.assign(settings, updateSettingsDto)
      await this.settingsRepository.save(settings)
      return this.userRepository.findOne({
        where: { id: userId },
        relations: ['settings'],
      })
    }
    const settingEntity = this.settingsRepository.create({
      ...updateSettingsDto,
      user,
    })

    const data = await this.settingsRepository.save(settingEntity)
    user.settings = data
    await this.userRepository.save(user)
    return data
  }
}
