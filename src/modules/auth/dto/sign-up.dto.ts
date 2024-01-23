import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class SignUpDto {
  @IsString()
  fullName: string

  @IsString()
  telphone: string

  @IsString()
  @IsOptional()
  tinNumber: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(4)
  password: string
}

export class SignUpDtoWithPass extends SignUpDto {
  @IsString()
  confirmPassword: string
}
