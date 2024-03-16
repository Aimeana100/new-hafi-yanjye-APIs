import { CreateProductReviewDto } from './create-product-review.dto'
import { PartialType } from '@nestjs/mapped-types'

export class UpdateProductReviewDto extends PartialType(
  CreateProductReviewDto,
) {}
