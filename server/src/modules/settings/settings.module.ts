import { Module } from '@nestjs/common'
import { SettingsService } from './settings.service'
import { SettingsController } from './settings.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SettingsRepository } from './settings.repository'
import { Setting } from './entities/settings.entity'
import { UserRepository } from '../users/user.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([Setting, SettingsRepository, UserRepository]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService, SettingsRepository, UserRepository],
})
export class SettingsModule {}
