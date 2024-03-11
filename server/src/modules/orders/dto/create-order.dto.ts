import { IsArray, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  order: OrderType[]

  @IsNumber()
  @IsNotEmpty()
  delivery_site: number
}

class OrderType {
  @IsNumber()
  @IsNotEmpty()
  productId: number

  @IsNumber()
  @IsNotEmpty()
  quantity: number
}
