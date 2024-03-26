import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateDiscountDto } from './dto/create-discount.dto'
import { UpdateDiscountDto } from './dto/update-discount.dto'
import { Discount } from './entities/discount.entity'
import { In } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from '../products/entities/product.entity'
import { Category } from '../categories/entities/category.entity'
import { CategoryRepository } from '../categories/categories.repository'
import { DiscountRepository } from './discounts.repository'
import { ProductRepository } from '../products/products.repository'

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: DiscountRepository,
    @InjectRepository(Product)
    private readonly productRepository: ProductRepository,
    @InjectRepository(Category)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    const { type, productIds, categoryIds, ...discountData } = createDiscountDto

    let associatedProducts: Product[] = []
    let associatedCategories: Category[] = []

    // Logic to associate discounts with products/categories based on discount type
    if (type === 'PRODUCTS' && productIds) {
      associatedProducts = await this.productRepository.find({
        where: { id: In(productIds) },
      })
    } else if (type === 'CATEGORIES' && categoryIds) {
      associatedCategories = await this.categoryRepository.find({
        where: { id: In(categoryIds) },
      })
    }

    // Create a new discount entity
    const discount = this.discountRepository.create({
      ...discountData,
      products: associatedProducts,
      categories: associatedCategories,
    })

    // Save the discount to the database
    return await this.discountRepository.save(discount)
  }

  async findAll() {
    return await this.discountRepository.find({
      relations: ['products', 'categories'],
    })
  }

  findOne(id: number) {
    // Retrieve a specific discount with associated products and categories from the database
    const discount = this.discountRepository.findOne({
      where: { id },
      relations: ['products', 'categories'],
    })

    // Throw NotFoundException if the discount is not found
    if (!discount) {
      throw new NotFoundException(`Discount with ID ${id} not found`)
    }

    return discount
  }

  async update(id: number, updateDiscountDto: UpdateDiscountDto) {
    // Find the discount in the database
    const discount = await this.discountRepository.findOne({ where: { id } })

    // Throw NotFoundException if the discount is not found
    if (!discount) {
      throw new NotFoundException(`Discount with ID ${id} not found`)
    }

    // Update the discount properties
    discount.startAt = updateDiscountDto.startAt
    discount.endAt = updateDiscountDto.endAt
    discount.rate = updateDiscountDto.rate
    discount.type = updateDiscountDto.type
    discount.products = updateDiscountDto.productIds
      ? updateDiscountDto.productIds.map(
          (productId) => ({ id: productId }) as Product,
        )
      : []
    discount.categories = updateDiscountDto.categoryIds
      ? updateDiscountDto.categoryIds.map(
          (categoryId) => ({ id: categoryId }) as Category,
        )
      : []

    // Save the updated discount to the database
    return this.discountRepository.save(discount)
  }

  async remove(id: number) {
    // Find the discount in the database
    const discount = await this.discountRepository.findOne({ where: { id } })

    // Throw NotFoundException if the discount is not found
    if (!discount) {
      throw new NotFoundException(`Discount with ID ${id} not found`)
    }

    // Remove the discount from the database
    await this.discountRepository.remove(discount)
  }
}
