import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
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
}
