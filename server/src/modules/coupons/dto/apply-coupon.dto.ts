import { IsNotEmpty, IsString } from 'class-validator'

export class ApplyCouponDto {
  @IsString()
  @IsNotEmpty()
  orderId: string
  @IsString()
  @IsNotEmpty()
  couponCode: string
}
