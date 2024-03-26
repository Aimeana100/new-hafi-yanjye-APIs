import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductRepository } from './products.repository'
import { CategoryRepository } from '../categories/categories.repository'
import { ProductImageRepository } from './product-image.repository'
import { FilterProductDto } from './dto/get-all-products.dto'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { CreateProductReviewDto } from './dto/create-product-review.dto'
import { REQUEST } from '@nestjs/core'
import { CustomRequest } from '../auth/auth.constants'
import { UserRepository } from '../users/user.repository'
import { ProductReviewRepository } from './products-review.repository'
import { UpdateProductReviewDto } from './dto/update-product-review.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(ProductImageRepository)
    private productImageRepository: ProductImageRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    @Inject(CloudinaryService) private cloudinaryService: CloudinaryService,
    @Inject(REQUEST) private request: CustomRequest,
    @InjectRepository(ProductReviewRepository)
    private productReviewRepository: ProductReviewRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async create(
    images: Express.Multer.File[],
    createProductDto: CreateProductDto,
  ) {
    const item = await this.productRepository.findOne({
      where: {
        name: createProductDto.name,
        category: {
          id: createProductDto.categoryId,
        },
      },
    })

    if (item) {
      throw new BadRequestException(
        'Product name already exists under the same category',
      )
    }

    const category = await this.categoryRepository.findOne({
      where: { id: createProductDto.categoryId },
    })

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createProductDto.categoryId} not found.`,
      )
    }

    // Create a new Product entity and associate it with the loaded category
    const product = this.productRepository.create({
      ...createProductDto,
      category: category,
    })

    const uploadedLinks = await this.cloudinaryService.uploadImages(images)
    // Save the product entity to the database
    await this.productRepository.save(product)
    // Create new ProductImage entities and associate them with the saved product
    const productImages = uploadedLinks.map((image) =>
      this.productImageRepository.create({
        name: image.original_filename,
        link: image.secure_url,
        product,
      }),
    )

    // Set the images directly on the product entity before saving
    product.images = await this.productImageRepository.save(productImages)

    // Save the product entity again to update the images relationship
    await this.productRepository.save(product)

    return this.productRepository.findOne({
      where: { id: product.id },
      relations: { images: true, category: true },
    })
  }

  async findAll(filterProductDto: FilterProductDto) {
    // return this.productRepository.find({
    //   relations: { category: true, images: true },
    // })
    const { name, price, take, skip } = filterProductDto

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.ratings', 'ratings')

      // .leftJoinAndSelect('product.orders', 'orders')
      .where(name ? 'product.name LIKE :name' : '1=1', { name: `%${name}%` })
      .andWhere(price !== undefined ? 'product.price = :price' : '1=1', {
        price,
      })
      .take(Number(take) || undefined)
      .skip(Number(skip) || 0)
      .orderBy('product.id', 'ASC')

    return await queryBuilder.getMany()
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category', 'ratings', 'ratings.rater', 'images'],
    })
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto)
  }

  remove(id: number) {
    return this.productRepository.softDelete(id)
  }

  async createReview(
    productId: number,
    createProductReviewDto: CreateProductReviewDto,
  ) {
    const { id: userId } = this.request.user
    const reviewer = await this.userRepository.getUserById(userId)

    const product = await this.productRepository.findOne({
      where: { id: productId },
    })
    const rating = await this.productReviewRepository.findOne({
      where: { product: { id: productId }, rater: { id: userId } },
    })

    if (rating) {
      throw new BadRequestException(' already rated this product')
    }
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`)
    }
    const review = this.productReviewRepository.create({
      ...createProductReviewDto,
      product,
      rater: reviewer,
    })
    await this.productReviewRepository.save(review)

    const productReview = await this.productReviewRepository.find({
      where: {
        product: {
          id: productId,
        },
      },
    })

    const totalRatings = productReview.reduce(
      (sum, productRating) => sum + productRating.rating,
      0,
    )

    const averageRating = Math.ceil(totalRatings / productReview.length)

    await this.productRepository.update(productId, { averageRating })

    return this.productRepository.findOne({
      where: { id: product.id },
      relations: ['ratings', 'category'],
    })
  }
  findAllReviews(productId: number) {
    return this.productReviewRepository.find({
      where: { product: { id: productId } },
      relations: ['rater'],
    })
  }

  async updateReview(
    reviewId: number,
    updateProductReviewDto: UpdateProductReviewDto,
  ) {
    const { id: userId } = this.request.user
    const review = await this.productReviewRepository.findOne({
      where: { id: reviewId, rater: { id: userId } },
    })
    if (!review) {
      throw new ForbiddenException(
        `Review with ID ${reviewId} not found of not owned by you`,
      )
    }
    await this.productReviewRepository.update(reviewId, updateProductReviewDto)
    return this.productRepository.findOne({
      where: { id: review.product.id },
      relations: ['ratings', 'category'],
    })
  }

  deleteReview(id: number) {
    return this.productReviewRepository.softDelete(id)
  }
}
