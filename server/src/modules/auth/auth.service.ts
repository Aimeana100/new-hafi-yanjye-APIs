import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { Role } from '../users/entities/user.entity'
import { UserRepository } from '../users/user.repository'
import { BcryptService } from './bcrypt.service'
import { PasswordResetDto } from './dto/password-reset.dto'
import { MailService } from 'src/utils/emails'
import { UpdatepasswordDto } from './dto/updatate-password.dto'
import { ConfigService } from '@nestjs/config'
import { ChangePasswordDto } from './dto/change-password.dto'
import { REQUEST } from '@nestjs/core'
import { CustomRequest } from './auth.constants'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private mailService: MailService,
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(REQUEST) private readonly request: CustomRequest,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findByEmail(signInDto.email)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    if (!user?.password) {
      throw new UnauthorizedException(
        'Invalid credentials, seem to have google account',
      )
    }
    if (
      !(await this.bcryptService.compare(signInDto.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const payload = { id: user.id, email: user.email, role: user.role }
    return {
      token: await this.jwtService.signAsync(payload, { expiresIn: '2d' }),
      user,
    }
  }

  async signUp(signUpto: SignUpDto) {
    let user = await this.userRepository.getUserByEmail(signUpto.email)
    if (user) {
      throw new ConflictException('User with the same Email already exists')
    }
    const userEntity = this.userRepository.create({
      ...signUpto,
      role: Role.CUSTOMER,
      password: await this.bcryptService.hash(signUpto.password),
    })
    user = await this.userRepository.save(userEntity)
    await this.usersService.createDefaultSettings(user)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userPublic } = user
    return userPublic
  }

  async googleLogin(req: any) {
    const { email } = req.user

    let user = await this.userRepository.getUserByEmail(email)

    if (!user) {
      const userEntity = this.userRepository.create({
        email,
        role: Role.CUSTOMER,
        fullName: req.user.displayName,
        tinNumber: '',
        password: '',
        telephone: '',
      })
      user = await this.userRepository.save(userEntity)
      await this.usersService.createDefaultSettings(user)
    }

    const payload = { id: user.id, email: user.email, role: user.role }
    return {
      token: await this.jwtService.signAsync(payload, { expiresIn: '2d' }),
      user,
    }
  }

  async resetPassword(passwordResetDto: PasswordResetDto) {
    const user = await this.usersService.findByEmail(passwordResetDto.email)

    if (!user) {
      throw new NotFoundException('User not found')
    }
    const payload = { id: user.id, email: user.email, role: user.role }

    const token = await this.jwtService.signAsync(payload, { expiresIn: '30m' })

    const emailOption = {
      to: user.email,
      subject: 'Reset Password',
      text: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                background-color: #FAFAFA;
                color: #333;
                margin: 0;
                padding: 10px;
              }
    
              header {
                background-color: #4288C1;
                color: #fff;
                padding: 10px;
                text-align: center;
              }
    
              main {
                padding: 20px;
              }
    
              footer {
                background-color: #4288C1;
                color: #fff;
                padding: 10px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <header>
              <h1> Hafi Yanjye</h1>
            </header>
    
            <main>
              <p>Hello ${user.fullName},</p>
              <p>Click the following <a href=" ${this.configService.get<string>(
                'FRONTEND',
              )}/password/reset/${token}">Link to reset your password.</a> </p>
    
              <br>
    
              <p>If you didn't request a password reset, you can ignore this email.</p>
            </main>
    
            <footer>
              <p>Best regards,</p>
            </footer>
          </body>
        </html>
      `,
    }
    await this.mailService.sendResetEmail(emailOption)

    return {
      message: `A link to reset your password has been sent successfully to ${user.email}`,
    }
  }

  async updatePassword(token: string, updatePasswordDto: UpdatepasswordDto) {
    const updatePasswordPayload = await this.jwtService
      .verifyAsync(token)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err) => {
        throw new BadRequestException('Invalid token ')
      })

    const user = await this.usersService.findByEmail(
      updatePasswordPayload.email,
    )
    if (!user) {
      throw new NotFoundException('User not found')
    }
    const userEntity = this.userRepository.create({
      ...user,
      password: await this.bcryptService.hash(updatePasswordDto.newPassword),
    })
    await this.userRepository.save(userEntity)
    return { message: `New Password changed successfully ` }
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { email } = this.request.user
    const user = await this.userRepository.findOne({
      where: { email },
    })
    if (
      !(await this.bcryptService.compare(
        changePasswordDto.password,
        user.password,
      ))
    ) {
      throw new UnauthorizedException('Old password is incorrect')
    }

    const newHashedPassword = await this.bcryptService.hash(
      changePasswordDto.newPassword,
    )

    const userEntity = this.userRepository.create({
      ...user,
      password: newHashedPassword,
    })

    await this.userRepository.save(userEntity)
    return { message: 'Password changed successfully' }
  }
}
