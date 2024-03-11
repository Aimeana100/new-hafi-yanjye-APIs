import { Module } from '@nestjs/common'
import { CustomersService } from './customers.service'
import { CustomersController } from './customers.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from '../users/user.repository'
import { User } from '../users/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
