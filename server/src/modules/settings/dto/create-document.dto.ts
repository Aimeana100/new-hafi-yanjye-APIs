import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { documentType } from '../entities/document.entity'

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  text: string
  @IsString()
  externalLink: string

  @IsEnum(documentType)
  documentType: documentType
}
