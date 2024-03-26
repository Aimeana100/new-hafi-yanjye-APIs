// filter-users.dto.ts

import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator'
import { Role } from '../entities/user.entity'
import { Transform } from 'class-transformer'

export class FilterUsersDto {
  @IsOptional()
  @IsString()
  fullName?: string

  @IsOptional()
  @IsString()
  telephone?: string

  @IsOptional()
  @IsString()
  tinNumber?: string

  @IsOptional()
  @IsEnum(Role)
  role?: Role

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  userId?: number
}
