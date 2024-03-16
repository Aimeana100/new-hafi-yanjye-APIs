import { IsNotEmpty, IsNumber } from 'class-validator'

export class AssignOderRoDriverDto {
  @IsNumber()
  @IsNotEmpty()
  driverId: number

  @IsNumber()
  @IsNotEmpty()
  orderId: number
}
