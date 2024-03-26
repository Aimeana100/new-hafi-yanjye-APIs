import { Module } from '@nestjs/common'
import { DiscountsService } from './discounts.service'
import { DiscountsController } from './discounts.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Discount } from './entities/discount.entity'
import { Product } from '../products/entities/product.entity'
import { Category } from '../categories/entities/category.entity'
import { ProductRepository } from '../products/products.repository'
import { CategoryRepository } from '../categories/categories.repository'
import { DiscountRepository } from './discounts.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Discount,
      Product,
      Category,
      DiscountRepository,
      ProductRepository,
      CategoryRepository,
    ]),
  ],
  controllers: [DiscountsController],
  providers: [
    DiscountsService,
    DiscountRepository,
    ProductRepository,
    CategoryRepository,
  ],
  exports: [DiscountsService],
})
export class DiscountsModule {}
