import { Module } from '@nestjs/common'
import { SupplierService } from './supplier.service'
import { SupplierController } from './supplier.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Supplier } from './entities/supplier.entity'
import { SupplierRepository } from './supplier.repository'
import { UserRepository } from '../users/user.repository'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { MailService } from 'src/utils/emails'
import { BcryptService } from '../auth/bcrypt.service'
import { SettingsRepository } from '../settings/settings.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Supplier,
      User,
      SupplierRepository,
      UserRepository,
      SettingsRepository,
    ]),
  ],
  controllers: [SupplierController],
  providers: [
    SupplierService,
    MailService,
    UsersService,
    SupplierRepository,
    UserRepository,
    BcryptService,
    SettingsRepository,
  ],
})
export class SupplierModule {}
