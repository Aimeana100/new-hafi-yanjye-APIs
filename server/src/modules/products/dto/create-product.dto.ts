import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { ProductImageDto } from './create-product-images.dto'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price: number

  @IsNumber({ maxDecimalPlaces: 2 })
  cost: number

  @IsNumber()
  quatity: number

  @IsString()
  datasheet_link: string

  @IsString()
  video_link: string

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  images: ProductImageDto[]

  @IsNotEmpty()
  @IsNumber()
  categoryId: number
}
