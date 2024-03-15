import { OrderStatus } from '../entities/order.entity'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ChangeOrderStatusDto {
  // @ApiProperty({ enum: OrderStatus })
  // @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus
}
