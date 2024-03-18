import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator'
import { CURRENCY, LANGUAGE } from '../entities/settings.entity'

export class CreateSettingsDto {
  @IsEnum(CURRENCY)
  @IsNotEmpty()
  preferredCurrency: CURRENCY

  @IsEnum(LANGUAGE)
  @IsNotEmpty()
  preferredLanguage: LANGUAGE

  @IsBoolean()
  @IsNotEmpty()
  receiveOrderNotifications: boolean

  @IsBoolean()
  @IsNotEmpty()
  receiveReminderNotifications: boolean

  @IsBoolean()
  @IsNotEmpty()
  receiveOfferNotifications: boolean

  @IsBoolean()
  @IsNotEmpty()
  receiveFeedbackNotifications: boolean

  @IsBoolean()
  @IsNotEmpty()
  receiveUpdateNotifications: boolean
}
