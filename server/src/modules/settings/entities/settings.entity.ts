import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../../users/entities/user.entity'

export enum LANGUAGE {
  EN = 'EN',
  FR = 'FR',
  KI = 'KI',
}

export enum CURRENCY {
  FRW = 'RWF',
  EUR = 'EUR',
  USD = 'USD',
}

@Entity()
export class Setting {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: CURRENCY.FRW })
  preferredCurrency: CURRENCY

  @Column({ default: LANGUAGE.EN })
  preferredLanguage: LANGUAGE

  @Column({ default: true })
  receiveOrderNotifications: boolean

  @Column({ default: true })
  receiveReminderNotifications: boolean

  @Column({ default: true })
  receiveOfferNotifications: boolean

  @Column({ default: true })
  receiveFeedbackNotifications: boolean

  @Column({ default: true })
  receiveUpdateNotifications: boolean

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}
