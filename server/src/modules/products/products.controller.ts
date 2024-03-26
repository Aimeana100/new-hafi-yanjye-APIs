import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { FilterProductDto } from './dto/get-all-products.dto'
import { FilesInterceptor } from '@nestjs/platform-express'
import { multerConfigOptions } from '../../config/multer.config'
import { Roles } from '../auth/roles/roles.decorator'
import { Role } from '../users/entities/user.entity'
import { AuthGuard } from '../auth/auth.guard'
import { RolesGuard } from '../auth/roles/roles.guard'
import { CreateProductReviewDto } from './dto/create-product-review.dto'

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  @ApiResponse({ status: 403, description: 'Forbidden access' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images', 10, multerConfigOptions))
  async create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(images, createProductDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAll(@Query() filterProductDto: FilterProductDto) {
    return this.productsService.findAll(filterProductDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single product' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product by id' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id)
  }

  @Roles(Role.ADMIN, Role.DRIVER, Role.AGENT, Role.CUSTOMER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a review' })
  @ApiResponse({ status: 201, description: 'Review added successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  @ApiResponse({ status: 403, description: 'Forbidden access' })
  @ApiBearerAuth()
  @Post(':productId/reviews')
  createReview(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() createProductReviewDto: CreateProductReviewDto,
  ) {
    return this.productsService.createReview(productId, createProductReviewDto)
  }

  @Roles(Role.ADMIN, Role.DRIVER, Role.AGENT, Role.CUSTOMER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a review' })
  @ApiResponse({ status: 201, description: 'Review added successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  @ApiResponse({ status: 403, description: 'Forbidden access' })
  @ApiBearerAuth()
  @Patch(':productId/reviews')
  updateReview(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() updateProductReviewDto: CreateProductReviewDto,
  ) {
    return this.productsService.updateReview(productId, updateProductReviewDto)
  }
}
