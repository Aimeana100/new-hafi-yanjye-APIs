import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { generateRandomPassword } from 'src/utils/generate-password'
import { EmailOption, MailService } from 'src/utils/emails'
import { BcryptService } from '../auth/bcrypt.service'
import { FilterUsersDto } from './dto/get-all-users.dto'
import { Role } from './entities/user.entity'
import { REQUEST } from '@nestjs/core'
import { CustomRequest } from '../auth/auth.constants'
// import { OrderStatus } from '../orders/entities/order.entity'
// import { OrderDetails } from '../orders/entities/order-details.entity'
// import { OrderProcess } from '../orders/entities/order-process.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @Inject(MailService) private mailService: MailService,
    @Inject(BcryptService) private bcyService: BcryptService,
    @Inject(REQUEST) private readonly request: CustomRequest,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email)
    if (user) {
      throw new ConflictException('User with the same Email already exists')
    }
    const password = generateRandomPassword()
    const hashedPassword = await this.bcyService.hash(password)
    const userEntity = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    })

    const emailOption: EmailOption = {
      to: userEntity.email,
      subject: 'HafiYanjye - New Account Creation',
      text: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New User Account Confirmation</title>
          </head>
          <body>
            <h2>Hello ${userEntity.fullName},</h2>
            <p>Your new account has been created as ${userEntity.role}. <br> Use the generated credentials to access the application or change your password:</p>
            <br>
            <p><strong>Email:</strong> ${userEntity.email}</p>
            <p><strong>Password:</strong> ${password}</p>
            <br>
    
            <p>Enjoy our online service!</p>
    
            <br><br>
            <footer>
              <p>Best regards,<br>, HafiYanjye </p>
            </footer>
          </body>
        </html>
      `,
    }

    await this.mailService.sendResetEmail(emailOption)
    return this.userRepository.save(userEntity)
  }

  async findAll(filterUsersDto: FilterUsersDto) {
    // return this.userRepository.find({ relations: { orderProcessor: true } })

    const { fullName, telephone, tinNumber, role, email, userId } =
      filterUsersDto

    const query = this.userRepository.createQueryBuilder('user')

    // Only add the where clause if role is defined
    if (role) {
      query.where({ role })
    }
    if (userId) {
      query.andWhere('user.id = :userId', { userId })
    }

    // Dynamic filters
    if (fullName) {
      query.andWhere('user.fullName LIKE :fullName', {
        fullName: `%${fullName}%`,
      })
    }

    if (telephone) {
      query.andWhere('user.telephone LIKE :telephone', {
        telephone: `%${telephone}%`,
      })
    }

    if (tinNumber) {
      query.andWhere('user.tinNumber LIKE :tinNumber', {
        tinNumber: `%${tinNumber}%`,
      })
    }

    if (email) {
      query.andWhere('user.email LIKE :email', { email: `%${email}%` })
    }

    if (role === Role.AGENT) {
      return await query
        .leftJoinAndSelect('user.orderProcessor', 'orderProcess')
        .leftJoinAndSelect('orderProcess.orderItem', 'orderItem')
        .leftJoinAndSelect('orderItem.order', 'order')
        .leftJoinAndSelect('orderItem.product', 'product')
        .getMany()
    } else if (role === Role.CUSTOMER) {
      return await query
        .leftJoinAndSelect('user.orders', 'orders')
        .leftJoinAndSelect('orders.orderDetails', 'orderDetails')
        .leftJoinAndSelect('orderDetails.product', 'product')
        .getMany()
    } else if (role === Role.DRIVER) {
      return 'Implementation In progress '
    }
    return query.getMany()
  }

  me() {
    const { id: userId } = this.request.user
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['settings'],
    })
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: [
        'orderProcessor',
        'orderProcessor.orderItem',
        'orderProcessor.orderItem.order',
        'orders',
        'orders.orderDetails',
        'orders.orderDetails.product',
      ],
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    return this.userRepository.softDelete(id)
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email)
    return user
  }
}
