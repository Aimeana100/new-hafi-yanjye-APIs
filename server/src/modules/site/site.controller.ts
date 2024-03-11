import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import {
  DistrictService,
  ProvinceService,
  SectorService,
  SiteService,
} from './site.service'
import { CreateSiteDto } from './dto/create-site.dto'
import { UpdateSiteDto } from './dto/update-site.dto'
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

@ApiTags('sites')
@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create site | Collection' })
  @ApiResponse({ status: 201, description: 'Site created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @Post()
  create(@Body() createSiteDto: CreateSiteDto) {
    return this.siteService.create(createSiteDto)
  }

  @Get()
  findAll() {
    return this.siteService.findAll()
  }

  @Get('province/:id')
  findAllByProvince(@Param('id') id: number) {
    return this.siteService.findByProvince(id)
  }
  @Get('district/:id')
  findAllByDistrict(@Param('id') id: number) {
    return this.siteService.findByDistrict(id)
  }

  @Get('sector/:id')
  findAllBySector(@Param('id') id: number) {
    return this.siteService.findBySector(id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto) {
    return this.siteService.update(+id, updateSiteDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteService.remove(+id)
  }
}

@ApiTags('province')
@Controller('site/address')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @ApiOperation({ summary: 'Get all provinces' })
  @ApiResponse({ status: 200, description: 'provinces retrieved' })
  @Get('province')
  findAll() {
    return this.provinceService.findAll()
  }
}

@ApiTags('district')
@Controller('site/address')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: 'Get all sectors' })
  @ApiResponse({ status: 200, description: 'sectors ' })
  @Get('district')
  findAll() {
    return this.districtService.findAll()
  }
  @ApiOperation({ summary: 'Get all sectors in particular Province' })
  @ApiResponse({ status: 200, description: 'sectors in province' })
  @Get('district/:id')
  findAllByProvince(@Param('id') id: number) {
    return this.districtService.findAllByProvince(id)
  }
}

@ApiTags('sector')
@Controller('site/address')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @ApiOperation({ summary: 'Get all sectors' })
  @ApiResponse({ status: 200, description: 'sectors ' })
  @Get('sector')
  findAll() {
    return this.sectorService.findAll()
  }

  @ApiOperation({ summary: 'Get all sectors' })
  @ApiResponse({ status: 200, description: 'sectors ' })
  @Get('sector/:id')
  findAllByDistrict(@Param('id') id: number) {
    return this.sectorService.findAllByDistrict(id)
  }
}
