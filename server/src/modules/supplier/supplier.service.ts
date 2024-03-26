import { Inject, Injectable } from '@nestjs/common'
import { CreateSupplierDto } from './dto/create-supplier.dto'
import { UpdateSupplierDto } from './dto/update-supplier.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { SupplierRepository } from './supplier.repository'
import { CustomRequest } from '../auth/auth.constants'
import { REQUEST } from '@nestjs/core'
import { UsersService } from '../users/users.service'

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierRepository)
    private supplierRepository: SupplierRepository,
    private userService: UsersService,
    @Inject(REQUEST) private readonly request: CustomRequest,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    const currentUser = await this.userService.findOne(this.request.user.id)
    const supplier = this.supplierRepository.create({
      ...createSupplierDto,
      createdBy: currentUser,
    })
    return this.supplierRepository.save(supplier)
  }

  findAll() {
    return this.supplierRepository.find({
      relations: {
        createdBy: true,
      },
    })
  }

  findOne(id: number) {
    return this.supplierRepository.findOne({
      where: { id },
      relations: {
        createdBy: true,
      },
    })
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return this.supplierRepository.update(id, updateSupplierDto)
  }

  remove(id: number) {
    return this.supplierRepository.delete(id)
  }
}
