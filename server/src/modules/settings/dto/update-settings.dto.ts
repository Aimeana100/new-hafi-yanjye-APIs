import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator'
import { CURRENCY, LANGUAGE } from '../entities/settings.entity'
import { Optional } from '@nestjs/common'

export class UpdateSettingsDto {
  @IsEnum(CURRENCY)
  @IsNotEmpty()
  @Optional()
  preferredCurrency: CURRENCY

  @IsEnum(LANGUAGE)
  @IsNotEmpty()
  @Optional()
  preferredLanguage: LANGUAGE

  @IsBoolean()
  @IsNotEmpty()
  @Optional()
  receiveOrderNotifications: boolean

  @IsBoolean()
  @IsNotEmpty()
  @Optional()
  receiveReminderNotifications: boolean

  @IsBoolean()
  @IsNotEmpty()
  @Optional()
  receiveOfferNotifications: boolean

  @IsBoolean()
  @IsNotEmpty()
  @Optional()
  receiveFeedbackNotifications: boolean

  @IsBoolean()
  @IsNotEmpty()
  @Optional()
  receiveUpdateNotifications: boolean
}
