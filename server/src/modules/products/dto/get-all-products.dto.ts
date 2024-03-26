// filter.dto.ts
import { IsOptional, IsString } from 'class-validator'

export class FilterProductDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  //   @IsPositive()
  price?: number

  @IsOptional()
  @IsString()
  //   @IsPositive()
  take?: number

  @IsOptional()
  @IsString()
  //   @IsPositive()
  skip?: number
}
