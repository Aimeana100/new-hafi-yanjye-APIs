import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { CreateCouponDto } from './dto/create-coupon.dto'
import { UpdateCouponDto } from './dto/update-coupon.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { CouponRepository } from './coupons.repository'
import { ProductRepository } from '../products/products.repository'
import { In } from 'typeorm'
import { generateCode } from '../../utils/generateId'
import { validate } from 'class-validator'
import { Order, OrderStatus } from '../orders/entities/order.entity'
import { OrderRepository } from '../orders/orders.repository'
import { ApplyCouponDto } from './dto/apply-coupon.dto'

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(CouponRepository)
    private couponRepository: CouponRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
  ) {}

  async create(createCouponDto: CreateCouponDto) {
    const products = await this.productRepository.find({
      where: {
        id: In(createCouponDto.productIds),
      },
    })
    const coupon = this.couponRepository.create({
      ...createCouponDto,
      code: generateCode(6),
      timeUsage: 0,
      products: products,
    })
    return this.couponRepository.save(coupon)
  }

  findAll() {
    return this.couponRepository.find({ relations: { products: true } })
  }

  findOne(id: number) {
    return this.couponRepository.findOne({
      where: { id },
      relations: { products: true },
    })
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return this.couponRepository.update(id, updateCouponDto)
  }

  remove(id: number) {
    return this.couponRepository.delete(id)
  }

  async applyCoupon(applyCouponDto: ApplyCouponDto): Promise<Order | null> {
    // Find the order by orderId

    const { orderId, couponCode } = applyCouponDto

    const order = await this.orderRepository.findOne({
      where: { orderId },
      relations: ['orderDetails', 'coupon'],
    })

    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`)
    }

    // Check if the order status is suitable for applying a coupon
    if (order.status !== OrderStatus.PENDING) {
      throw new UnprocessableEntityException(
        `Cannot apply coupon to an order with status other than PENDING`,
      )
    }

    const coupon = await this.couponRepository.findOne({
      where: { code: couponCode },
      relations: ['products'],
    })

    if (!coupon) {
      throw new NotFoundException(`Coupon Code not found`)
    }

    // Check if the coupon is applicable to the order
    const applicableOrderDetails = order.orderDetails.filter((od) =>
      coupon.products.some(
        (couponProduct) => od.product.id === couponProduct.id,
      ),
    )

    if (applicableOrderDetails.length === 0) {
      throw new UnprocessableEntityException(
        'Coupon is not applicable to any products in the order',
      )
    }

    // Apply the coupon rate to each applicable product's price
    applicableOrderDetails.forEach((orderDetail) => {
      const product = coupon.products.find(
        (prod) => prod.id === orderDetail.product.id,
      )
      if (product) {
        orderDetail.product.price *= 1 - coupon.rate
      }
    })

    // Validate the modified order details
    const errors = await validate(order, { skipMissingProperties: true })

    if (errors.length > 0) {
      throw new BadRequestException(errors)
    }

    // Calculate the new total for the order
    order.total = order.orderDetails.reduce(
      (acc, od) => acc + od.product.price * od.quantity,
      0,
    )

    // Save the updated order to the database
    const updatedOrder = await this.orderRepository.save(order)

    return updatedOrder
  }
}
