import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'

export class CreateSiteDto {
  @MinLength(2)
  @IsNotEmpty()
  @IsString()
  name: string

  @MinLength(3)
  @IsOptional()
  description: string

  @IsOptional()
  @IsNumber()
  province: number

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  district: number

  @IsNotEmpty()
  @IsNumber()
  sector: number

  // @IsNotEmpty()
  // @IsNumber()
  // cell: number
}
