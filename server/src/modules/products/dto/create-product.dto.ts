import {
  IsNotEmpty,
  IsNumber,
  IsString,
  // ValidateNested,
} from 'class-validator'
// import { Type } from 'class-transformer'
// import { ProductImageDto } from './create-product-images.dto'
import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price: number

  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  cost: number

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  quantity: number

  @IsString()
  datasheet_link: string

  @IsString()
  video_link: string

  // @IsNotEmpty()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => ProductImageDto)
  // images: ProductImageDto[]
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  // @IsObject({ message: 'Files should be provided' })
  images: any[]

  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  categoryId: number
}
