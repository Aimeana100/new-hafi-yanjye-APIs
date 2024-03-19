import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SettingsRepository } from './settings.repository'
import { UpdateSettingsDto } from './dto/update-settings.dto'
import { REQUEST } from '@nestjs/core'
import { CustomRequest } from '../auth/auth.constants'
import { UserRepository } from '../users/user.repository'
import { CreateDocumentDto } from './dto/create-document.dto'
import { DocumentRepository } from './document.repository'
import { UpdateDocumentDto } from './dto/update-document.dto'

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsRepository)
    private readonly settingsRepository: SettingsRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(DocumentRepository)
    private documentRepository: DocumentRepository,
    @Inject(REQUEST) private readonly request: CustomRequest,
  ) {}

  async updateSettings(updateSettingsDto: UpdateSettingsDto) {
    const { id: userId } = this.request.user

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['settings'],
    })

    const settings = user.settings
    if (settings) {
      Object.assign(settings, updateSettingsDto)
      await this.settingsRepository.save(settings)
      return this.userRepository.findOne({
        where: { id: userId },
        relations: ['settings'],
      })
    }
    const settingEntity = this.settingsRepository.create({
      ...updateSettingsDto,
      user,
    })

    const data = await this.settingsRepository.save(settingEntity)
    user.settings = data
    await this.userRepository.save(user)
    return data
  }

  async createDocument(createDocumentDto: CreateDocumentDto) {
    const doc = await this.documentRepository.findOne({
      where: { documentType: createDocumentDto.documentType },
    })
    if (doc) {
      throw new BadRequestException('Document already exist, try updating it')
    }
    const docEntity = this.documentRepository.create(createDocumentDto)
    return this.documentRepository.save(docEntity)
  }

  async updateDocument(id: number, updateDocumentDto: UpdateDocumentDto) {
    const doc = await this.documentRepository.findOne({
      where: { documentType: updateDocumentDto.documentType },
    })
    if (!doc) {
      throw new NotFoundException(
        `Document ${updateDocumentDto.documentType}  doesn't found`,
      )
    }
    await this.documentRepository.update(id, updateDocumentDto)
    return this.documentRepository.findOne({ where: { id: doc.id } })
  }

  async deleteDocument(documentId: number) {
    const doc = await this.documentRepository.findOne({
      where: { id: documentId },
    })
    if (!doc) throw new NotFoundException('document not found')
    return this.documentRepository.delete(documentId)
  }
}
