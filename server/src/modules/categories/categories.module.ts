import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { CategoryRepository } from './categories.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category, CategoryRepository])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
  exports: [CategoryRepository],
})
export class CategoriesModule {}
