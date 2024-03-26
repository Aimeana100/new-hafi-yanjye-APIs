import { IsNotEmpty, IsString } from 'class-validator'

export class UpdatepasswordDto {
  @IsString()
  @IsNotEmpty()
  newPassword: string
}
