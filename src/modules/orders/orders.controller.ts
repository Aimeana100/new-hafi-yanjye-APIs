import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
// import { UpdateOrderDto } from './dto/update-order.dto'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Role } from '../users/entities/user.entity'
import { AuthGuard } from '../auth/auth.guard'
import { RolesGuard } from '../auth/roles/roles.guard'
import { Roles } from '../auth/roles/roles.decorator'

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Create user / authenticated route ' })
  @ApiResponse({ status: 200, description: 'User created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create order' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto)
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all orders' })
  findAll() {
    return this.ordersService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Rertrieve single order' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.ordersService.update(+id, updateOrderDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ordersService.remove(+id)
  // }
}
