import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

export enum documentType {
  TERMS_OF_USE = 'TERMS_OF_USE',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  LICENSE = 'LICENSE',
  SELLER_POLICY = 'SELLER_POLICY',
  RETURN_POLICY = 'RETURN_POLICY',
}
@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  text: string

  @Column()
  externalLink: string

  @Column({ unique: true })
  // @Unique(['documentType'])
  documentType: documentType
}
