import { IsNotEmpty, IsString } from 'class-validator'

export class ProductImageDto {
  @IsString()
  name: string

  @IsString()
  @IsNotEmpty()
  link: string
}
