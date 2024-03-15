import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common'
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
import { AsignOrderAgentDto } from './dto/asignOrderAgent.dto'

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Create order / authenticated route ' })
  @ApiResponse({ status: 200, description: 'User created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto)
  }

  @ApiOperation({ summary: 'all orders / authenticated route ' })
  @ApiResponse({ status: 200, description: 'All orders' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(Role.CUSTOMER, Role.AGENT, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Retrieve all orders' })
  findAll() {
    return this.ordersService.findAll()
  }

  @ApiOperation({ summary: 'Retrieve single order' })
  @ApiResponse({ status: 201, description: 'All Orders' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  @ApiResponse({ status: 403, description: 'Forbidden access' })
  @Roles(Role.CUSTOMER, Role.AGENT, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id)
  }

  @ApiOperation({ summary: 'assign order items to agent' })
  @ApiResponse({ status: 201, description: 'assign order' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Post('assign/agent')
  asignOrderToAgent(@Body() asignOrderAgentDto: AsignOrderAgentDto) {
    return this.ordersService.asignOrderAgent(asignOrderAgentDto)
  }

  @Patch('confirm/:id')
  confirmOrder(@Param('id') id: string) {
    return this.ordersService.confirmOrder(+id)
  }

  @Patch('cancel/:id')
  cancelOrder(@Param('id') id: string) {
    return this.ordersService.concelOrder(+id)
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
