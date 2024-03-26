import { IsNotEmpty, ValidateNested } from 'class-validator'
import { OrderStatus } from '../entities/order.entity'

export class UpdateOrderDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  status: OrderStatus
}
