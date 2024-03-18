import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { SettingsService } from './settings.service'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Role } from '../users/entities/user.entity'
import { Roles } from '../auth/roles/roles.decorator'
import { AuthGuard } from '../auth/auth.guard'
import { RolesGuard } from '../auth/roles/roles.guard'
import { UpdateSettingsDto } from './dto/update-settings.dto'
import { CURRENCY, LANGUAGE } from './entities/settings.entity'
@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}
  @ApiOperation({ summary: 'update self system settings' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized access' })
  @ApiResponse({ status: 403, description: 'Forbidden access' })
  @Roles(Role.CUSTOMER, Role.DRIVER, Role.AGENT, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Patch('update')
  updateSettings(@Body() updateSettingsDto: UpdateSettingsDto) {
    return this.settingsService.updateSettings(updateSettingsDto)
  }
  @ApiOperation({ summary: 'Allowed languages' })
  @Get('languages')
  allLanguages() {
    return LANGUAGE
  }
  @ApiOperation({ summary: 'Allowed currencies' })
  @Get('currencies')
  allCurrencies() {
    return CURRENCY
  }
}
