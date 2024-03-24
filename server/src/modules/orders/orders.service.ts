import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderRepository } from './orders.repository'
import { ProductRepository } from '../products/products.repository'
import { OrderDetailsRepository } from './order-details.repository'
import { Order, OrderStatus } from './entities/order.entity'
import { OrderDetails } from './entities/order-details.entity'
import { UserRepository } from '../users/user.repository'
import { REQUEST } from '@nestjs/core'
import { CustomRequest } from '../auth/auth.constants'
import { Role } from '../users/entities/user.entity'
import { ILike, In, Repository, SelectQueryBuilder } from 'typeorm'
import { OrderProcess, ProcessStatuses } from './entities/order-process.entity'
import { AssignOrderAgentDto } from './dto/asignOrderAgent.dto'
import { SiteRepository } from '../site/site.repository'
import { Site } from '../site/entities/site.entity'
import { AssignOderRoDriverDto } from './dto/assign-oder-ro-driver.dto'
import { contains } from 'class-validator'
import { FilterOrderDto } from './dto/filter-order.dto'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(OrderDetailsRepository)
    private orderDetailsRepository: OrderDetailsRepository,
    @InjectRepository(OrderProcess)
    private orderProcessRepository: Repository<OrderProcess>,
    @Inject(REQUEST) private readonly request: CustomRequest,
    @InjectRepository(Site)
    private siteRepository: SiteRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // Validate products here
    const invalidProductIds = await this.validateProducts(createOrderDto.order)

    if (invalidProductIds.length) {
      throw new NotFoundException(
        `No Product associated with ${invalidProductIds.join(', ')}`,
      )
    }

    const deliver_address = await this.siteRepository.findOne({
      where: { id: createOrderDto.delivery_site },
    })
    if (!deliver_address) {
      throw new NotFoundException(' The site does not exist')
    }

    const { user } = this.request
    const orderObj: Partial<Order> = {
      orderId: await this.generateOrderId(),
      orderDate: new Date(),
      status: OrderStatus.PENDING,
      customer: await this.userRepository.findOne({ where: { id: user.id } }),
      delivery_site: deliver_address,
    }

    const order = this.orderRepository.create(orderObj)

    const newOrder = await this.orderRepository.save(
      this.orderRepository.create(order),
    )

    // trtansform orderDetatils
    for (const orderItem of createOrderDto.order) {
      const orderDetails = new OrderDetails()

      const product = await this.productRepository.findOne({
        where: { id: orderItem.productId },
      })

      orderDetails.product = product
      orderDetails.quantity = orderItem.quantity
      orderDetails.pricePerItem = product.price
      orderDetails.order = newOrder

      const orderDetailsEntity = this.orderDetailsRepository.create({
        ...orderDetails,
        quantity: orderItem.quantity,
      })

      const newOrderDetails =
        await this.orderDetailsRepository.save(orderDetailsEntity)

      newOrder.orderDetails = newOrder.orderDetails
        ? [...newOrder.orderDetails, newOrderDetails]
        : [newOrderDetails]

      newOrder.total = newOrder.total + product.price * orderItem.quantity
    }

    await this.orderRepository.save(newOrder)

    return newOrder
  }

  async assignOrderAgent(asignOrderAgentDto: AssignOrderAgentDto) {
    const { agentId, orderItems } = asignOrderAgentDto
    const agent = await this.userRepository.findOne({
      where: { id: agentId, role: Role.AGENT },
    })

    if (!agent) {
      throw new NotFoundException(`Could not find agent with Id: ${agentId} `)
    }

    const unexstingOrderItems: number[] = []
    const orderAgents: OrderProcess[] = []

    for (const orderItemId of orderItems) {
      const orderDetail = await this.orderDetailsRepository.findOne({
        where: { id: orderItemId },
      })
      if (!orderDetail) {
        unexstingOrderItems.push(orderItemId)
      } else {
        const orderAgent = this.orderProcessRepository.create({
          orderItemId: orderDetail.id,
          agent,
          orderItem: orderDetail,
          agentId: agent.id,
        })
        orderAgents.push(orderAgent)
      }
    }

    if (unexstingOrderItems.length) {
      throw new NotFoundException(
        `OrderDetails with ${unexstingOrderItems.join(', ')} not found `,
      )
    }

    await this.orderProcessRepository.save(orderAgents)

    return this.orderProcessRepository.find({
      where: { orderItemId: In(orderItems) },
    })
  }
  async findAll(
    filterOrderDto: FilterOrderDto,
  ): Promise<OrderDetails[] | Order[] | SelectQueryBuilder<Order>> {
    const { id: userId, role } = this.request.user

    if (role === Role.ADMIN) {
      return this.orderRepository.find({
        where: {
          ...(filterOrderDto.orderId && {
            orderId: ILike(`%${filterOrderDto.orderId}%`),
          }),
        },
        relations: {
          customer: true,
          orderDetails: {
            product: true,
            orderProcessor: {
              agent: true,
              orderItem: {
                product: true,
              },
            },
          },
          delivery_site: {
            sector: {
              district: {
                province: true,
              },
            },
          },
        },
      })
    }
    if (role === Role.CUSTOMER) {
      return this.orderRepository.find({
        where: {
          customer: {
            id: userId,
          },
          ...(filterOrderDto.orderId && {
            orderId: ILike(`%${filterOrderDto.orderId}%`),
          }),
        },
        relations: {
          orderDetails: {
            product: true,
            orderProcessor: {
              agent: true,
              orderItem: {
                product: true,
              },
            },
          },
          delivery_site: {
            sector: {
              district: {
                province: true,
              },
            },
          },
        },
      })
    }

    if (role === Role.AGENT) {
      return this.orderRepository.find({
        where: {
          orderDetails: {
            orderProcessor: {
              agentId: userId,
            },
          },
          ...(filterOrderDto.orderId && {
            orderId: ILike(`%${filterOrderDto.orderId}%`),
          }),
        },
        relations: {
          customer: true,
          orderDetails: {
            product: true,
            orderProcessor: true,
          },
          delivery_site: {
            sector: {
              district: {
                province: true,
              },
            },
          },
        },
      })
    }

    if (role === Role.DRIVER) {
      return this.orderRepository.find({
        where: {
          driver: {
            id: userId,
          },
          ...(filterOrderDto.orderId && {
            orderId: ILike(`%${filterOrderDto.orderId}%`),
          }),
        },
        relations: {
          customer: true,
          orderDetails: {
            product: true,
          },
          delivery_site: {
            sector: {
              district: {
                province: true,
              },
            },
          },
        },
      })
    }
  }

  findOne(id: number) {
    const { id: userId, role } = this.request.user

    if (role === Role.ADMIN) {
      return this.orderRepository.findOne({
        where: { id },
        relations: {
          customer: true,
          orderDetails: {
            product: true,
            orderProcessor: {
              agent: true,
              orderItem: {
                product: true,
              },
            },
          },
          delivery_site: {
            sector: {
              district: {
                province: true,
              },
            },
          },
        },
      })
    }
    if (role === Role.CUSTOMER) {
      return this.orderRepository.findOne({
        where: {
          customer: {
            id: userId,
          },
          id,
        },
        relations: {
          orderDetails: {
            product: true,
            orderProcessor: {
              agent: true,
              orderItem: {
                product: true,
              },
            },
          },
          delivery_site: {
            sector: {
              district: {
                province: true,
              },
            },
          },
        },
      })
    }

    if (role === Role.AGENT) {
      return this.orderRepository.findOne({
        where: {
          orderDetails: {
            orderProcessor: {
              agentId: userId,
            },
          },
          id,
        },
        relations: {
          customer: true,
          orderDetails: {
            product: true,
          },
          delivery_site: {
            sector: {
              district: {
                province: true,
              },
            },
          },
        },
      })
    }
    if (role == Role.DRIVER) {
      return this.orderRepository.findOne({
        where: {
          driver: {
            id: userId,
          },
          id,
        },
        relations: {
          customer: true,
          orderDetails: {
            product: true,
          },
          delivery_site: {
            sector: {
              district: {
                province: true,
              },
            },
          },
        },
      })
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(id, updateOrderDto)
  }

  confirmOrder(id: number) {
    return this.updateOrderStatus(id, OrderStatus.CONFIRMED)
  }

  cancelOrder(id: number) {
    return this.updateOrderStatus(id, OrderStatus.CANCELED)
  }

  async assignOrderToDriver(assignOrderToDriverDto: AssignOderRoDriverDto) {
    const { driverId, orderId } = assignOrderToDriverDto
    const driver = await this.userRepository.findOne({
      where: { id: driverId, role: Role.DRIVER },
    })
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['driver'],
    })
    if (!driver) {
      throw new NotFoundException('Driver not found')
    }
    if (!order) {
      throw new NotFoundException('Order not found')
    }
    if (order.driver) {
      throw new BadRequestException(
        `The order has already assigned a driver ${order.driver.fullName}`,
      )
    }
    order.driver = driver
    return this.orderRepository.save(order)
  }

  async deliverOrder(orderId: number) {
    const { id: userId } = this.request.user
    const order = await this.orderRepository.findOne({
      where: { id: orderId, driver: { id: userId } },
      relations: ['driver'],
    })
    if (!order) {
      throw new NotFoundException(
        'Order not found or is not assigned to a driver',
      )
    }
    return this.orderRepository.update(orderId, {
      status: OrderStatus.DELIVERED,
    })
  }

  completeOrder(orderId: number) {
    const order = this.orderRepository.findOne({ where: { id: orderId } })
    if (!order) {
      throw new NotFoundException('Order not found')
    }
    return this.orderRepository.update(orderId, {
      status: OrderStatus.COMPLETED,
    })
  }

  updateOrderItemInProcess(orderItemId: number) {
    return this.updateOrderItemStatus(orderItemId, ProcessStatuses.INPROGRESS)
  }

  updateOrderItemDone(orderItemId: number) {
    return this.updateOrderItemStatus(orderItemId, ProcessStatuses.DONE)
  }

  private async updateOrderStatus(id: number, status: OrderStatus) {
    await this.orderRepository.findById(id)
    return this.orderRepository.update(id, { status })
  }

  private async updateOrderItemStatus(
    id: number,
    processStatus: ProcessStatuses,
  ) {
    const currentUserId = this.request.user.id
    const orderItem = await this.orderProcessRepository.findOne({
      where: {
        id,
        agent: {
          id: currentUserId,
        },
      },
    })
    if (!orderItem) {
      throw new NotFoundException(
        `Order Item with id ${id} not found or not assigned to you`,
      )
    }
    await this.orderProcessRepository.update(id, { processStatus })
    return this.orderProcessRepository.findOne({ where: { id } })
  }
  remove(id: number) {
    return `This action removes a #${id} order`
  }

  private async generateOrderId(): Promise<string> {
    const lastOrder = await this.orderRepository.find({
      order: { id: 'DESC' },
    })

    const lastOrderId = lastOrder.length ? lastOrder[0].id : 0
    const nextOrderId = lastOrderId + 2

    // You can customize the format of your order ID, for example: 'ORD-2024-00001'
    const formattedOrderId = `ORD-${new Date().getFullYear()}-${nextOrderId
      .toString()
      .padStart(5, '0')}`

    return formattedOrderId
  }

  async validateProducts(
    orderItems: { productId: number; quantity: number }[],
  ): Promise<number[]> {
    // Get the list of product IDs from the order items
    const productIds = orderItems.map((item) => item.productId)

    // Find product IDs that have no associated products
    const invalidProductIds = []

    for (const productId of productIds) {
      const product = await this.productRepository.findOne({
        where: { id: productId },
      })
      if (!product) {
        invalidProductIds.push(productId)
      }
    }
    return invalidProductIds
  }
}
