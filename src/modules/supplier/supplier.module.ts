import { Module } from '@nestjs/common'
import { SupplierService } from './supplier.service'
import { SupplierController } from './supplier.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Supplier } from './entities/supplier.entity'
import { SupplierRepository } from './supplier.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Supplier, SupplierRepository])],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
