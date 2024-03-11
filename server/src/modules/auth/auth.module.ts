import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { jwtConstants } from './auth.constants'
import { UsersService } from '../users/users.service'
import { BcryptService } from './bcrypt.service'
import { MailService } from 'src/utils/emails'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, UsersService, BcryptService, MailService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
