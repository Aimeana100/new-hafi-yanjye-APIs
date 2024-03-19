import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserRepository } from './user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { MailService } from 'src/utils/emails'
import { BcryptService } from '../auth/bcrypt.service'
import { SettingsRepository } from '../settings/settings.repository'
import { SettingsModule } from '../settings/settings.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository, SettingsRepository]),
    SettingsModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    MailService,
    UserRepository,
    BcryptService,
    SettingsRepository,
  ],
  exports: [UserRepository, SettingsRepository],
})
export class UsersModule {}
