import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { Role } from '../entities/user.entity'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string

  @IsString()
  @IsNotEmpty()
  telphone: string

  @IsEnum(Role)
  role: Role

  @IsEmail()
  @IsNotEmpty()
  email: string
}
