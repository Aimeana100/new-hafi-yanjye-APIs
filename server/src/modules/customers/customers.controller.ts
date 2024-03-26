import { Controller, Get, Param } from '@nestjs/common'
import { CustomersService } from './customers.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Customer')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll() {
    return this.customersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id)
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCustomerDto: UpdateCustomerDto,
  // ) {
  //   return this.customersService.update(+id, updateCustomerDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customersService.remove(+id)
  // }
}
