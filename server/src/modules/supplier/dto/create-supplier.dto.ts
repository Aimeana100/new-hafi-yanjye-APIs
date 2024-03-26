import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  tinNumber: string

  @IsEmail()
  @IsOptional()
  email: string
}
