import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { ProductRepository } from './products.repository'
import { CategoriesModule } from '../categories/categories.module'
import { ProductImage } from './entities/product-image.entity'
import { ProductImageRepository } from './product-image.repository'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { ProductReviewRepository } from './products-review.repository'
import { UserRepository } from '../users/user.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImage,
      ProductRepository,
      ProductImageRepository,
    ]),
    CategoriesModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductRepository,
    ProductImageRepository,
    CloudinaryService,
    ProductReviewRepository,
    UserRepository,
  ],
})
export class ProductsModule {}
