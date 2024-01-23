import { Module } from '@nestjs/common'
import { CouponsService } from './coupons.service'
import { CouponsController } from './coupons.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CouponRepository } from './coupons.repository'
import { ProductRepository } from '../products/products.repository'
import { Product } from '../products/entities/product.entity'
import { Coupon } from './entities/coupon.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Coupon,
      Product,
      CouponRepository,
      ProductRepository,
    ]),
  ],
  controllers: [CouponsController],
  providers: [CouponsService, CouponRepository, ProductRepository],
})
export class CouponsModule {}
