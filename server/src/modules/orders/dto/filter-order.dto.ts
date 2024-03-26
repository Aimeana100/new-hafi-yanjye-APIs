import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class FilterOrderDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  orderId?: string
}
