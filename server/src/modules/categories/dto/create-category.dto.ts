import { IsNotEmpty, MinLength } from 'class-validator'
export class CreateCategoryDto {
  @MinLength(2)
  @IsNotEmpty()
  name: string

  @MinLength(3)
  description: string
  image: string
}
