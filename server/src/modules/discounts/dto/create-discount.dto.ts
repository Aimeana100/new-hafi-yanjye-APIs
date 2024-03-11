import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'
import { DiscountType } from '../entities/discount.entity'
import { Transform } from 'class-transformer'

export class CreateDiscountDto {
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  startAt: Date

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  endAt: Date

  @IsNumber()
  @Min(1)
  @Max(100)
  rate: number

  @IsString()
  // @IsEnum({ each: true })
  type: DiscountType

  @IsArray()
  @IsOptional()
  productIds: number[]

  @IsArray()
  @IsOptional()
  categoryIds: number[]
}
