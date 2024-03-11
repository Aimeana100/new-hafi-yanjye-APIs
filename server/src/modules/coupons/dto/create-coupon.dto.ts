import { Transform } from 'class-transformer'
import { IsArray, IsDate, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateCouponDto {
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  startAt: Date

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  endAt: Date

  @IsNotEmpty()
  @IsNumber()
  rate: number

  @IsNotEmpty()
  @IsNumber()
  minItems: number

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  minCost: number

  @IsNotEmpty()
  @IsArray({ each: true })
  productIds: number[]
}
