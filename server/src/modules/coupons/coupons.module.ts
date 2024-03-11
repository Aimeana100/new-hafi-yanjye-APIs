import { Module } from '@nestjs/common'
import { CouponsService } from './coupons.service'
import { CouponsController } from './coupons.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CouponRepository } from './coupons.repository'
import { ProductRepository } from '../products/products.repository'
import { Product } from '../products/entities/product.entity'
import { Coupon } from './entities/coupon.entity'
import { OrderRepository } from '../orders/orders.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Coupon,
      Product,
      CouponRepository,
      ProductRepository,
      OrderRepository,
    ]),
  ],
  controllers: [CouponsController],
  providers: [
    CouponsService,
    CouponRepository,
    ProductRepository,
    OrderRepository,
  ],
})
export class CouponsModule {}
