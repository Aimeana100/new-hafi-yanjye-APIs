import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { SignUpDtoWithPass } from './dto/sign-up.dto'
import { PasswordResetDto } from './dto/password-reset.dto'
import { UpdatepasswordDto } from './dto/updatate-password.dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { Roles } from './roles/roles.decorator'
import { Role } from '../users/entities/user.entity'
import { AuthGuard } from './auth.guard'
import { RolesGuard } from './roles/roles.guard'
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User loogin' })
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const data = await this.authService.signIn(signInDto)
    return { data, message: 'success' }
  }

  @Post('register')
  @ApiOperation({ summary: 'Sign up as a customer' })
  signUp(@Body() signUpdDto: SignUpDtoWithPass) {
    const { password, confirmPassword } = signUpdDto

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match')
    }
    return this.authService.signUp(signUpdDto)
  }

  @Post('reset-password')
  resetPassword(@Body() passwordResetDto: PasswordResetDto) {
    return this.authService.resetPassword(passwordResetDto)
  }

  @Post('/update-password/:token')
  updatetePassword(
    @Param('token') token: string,
    @Body() updatepasswordDto: UpdatepasswordDto,
  ) {
    return this.authService.updatePassword(token, updatepasswordDto)
  }

  @Roles(Role.ADMIN, Role.AGENT, Role.CUSTOMER, Role.DRIVER)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'user change password ' })
  @ApiResponse({ status: 200, description: 'password changed successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post('change-passwrd')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto)
  }
}
