import { OrderProcess } from '../../orders/entities/order-process.entity'
import { Order } from '../../orders/entities/order.entity'
import { Supplier } from '../../supplier/entities/supplier.entity'
import {
  AfterInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ProductReview } from '../../products/entities/product-review.entity'
import {
  Setting,
  CURRENCY,
  LANGUAGE,
} from '../../settings/entities/settings.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { SettingsRepository } from '../../settings/settings.repository'

export enum Role {
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
  DRIVER = 'DRIVER',
  CUSTOMER = 'CUSTOMER',
}

@Entity()
export class User {
  constructor(
    @InjectRepository(SettingsRepository)
    private settingsRepository: SettingsRepository,
  ) {}
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fullName: string

  @Column()
  telephone: string

  @Column({ nullable: true })
  tinNumber: string

  @Column({
    default: Role.AGENT,
  })
  role: Role

  @OneToMany(() => Order, (orders) => orders.customer)
  orders: Order[]

  @OneToMany(() => Order, (orders) => orders.driver)
  deliveries: Order[]

  @OneToMany(() => OrderProcess, (orderProcessor) => orderProcessor.agent)
  orderProcessor: OrderProcess[]

  @OneToMany(() => Supplier, (supplier) => supplier.createdBy)
  supplier: Supplier

  @OneToMany(() => ProductReview, (rating) => rating.rater)
  ratings: ProductReview[]

  @OneToOne(() => Setting, { cascade: true })
  @JoinColumn()
  settings: Setting

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  // @AfterInsert()
  // async createDefaultSettings() {
  //   const settings = new Setting()
  //   settings.user = this
  //   settings.preferredCurrency = CURRENCY.FRW
  //   settings.preferredLanguage = LANGUAGE.EN
  //   settings.receiveOrderNotifications = true
  //   settings.receiveReminderNotifications = true
  //   settings.receiveOfferNotifications = true
  //   settings.receiveFeedbackNotifications = true
  //   settings.receiveUpdateNotifications = true
  //
  //   await this.settingsRepository.save(settings)
  // }
}
