import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { CouponsService } from './coupons.service'
import { CreateCouponDto } from './dto/create-coupon.dto'
import { UpdateCouponDto } from './dto/update-coupon.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApplyCouponDto } from './dto/apply-coupon.dto'
@ApiTags('coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Coupon ' })
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto)
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all coupons ' })
  findAll() {
    return this.couponsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve single coupon by Id' })
  findOne(@Param('id') id: string) {
    return this.couponsService.findOne(+id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Coupon by id' })
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(+id, updateCouponDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Coupon by id ' })
  remove(@Param('id') id: string) {
    return this.couponsService.remove(+id)
  }

  @Post('apply')
  @ApiOperation({ summary: 'Apply Coupon code ' })
  applyCoupon(@Body() applyCouponDto: ApplyCouponDto) {
    return this.couponsService.applyCoupon(applyCouponDto)
  }
}
