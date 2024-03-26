import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class SignUpDto {
  @IsString()
  fullName: string

  @IsString()
  telephone: string

  @IsString()
  @IsOptional()
  tinNumber: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string
}

export class SignUpDtoWithPass extends SignUpDto {
  @IsString()
  confirmPassword: string
}
