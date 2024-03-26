import { Controller, Get, Post, UseGuards } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Roles } from '../auth/roles/roles.decorator'
import { Role } from '../users/entities/user.entity'
import { AuthGuard } from '../auth/auth.guard'
import { RolesGuard } from '../auth/roles/roles.guard'

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiTags('Payment/momo')
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Momo payment' })
  @ApiBearerAuth()
  @Post()
  momoPayment() {
    // return this.paymentService.momoPayment()
  }

  @ApiTags('Payment/momo')
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Momo payment' })
  @ApiBearerAuth()
  @Get()
  momoPaymentCallBack() {
    // return this.paymentService.momoPayment()
  }
}
