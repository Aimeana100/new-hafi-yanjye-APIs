import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'

export class CreateProductReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'minimum rating is 1' })
  @Max(5, { message: 'maximum number rating is 5' })
  rating: number
  @IsNotEmpty()
  @IsString()
  comment: string
}
