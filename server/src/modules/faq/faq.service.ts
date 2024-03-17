import { Injectable } from '@nestjs/common'
import { CreateFaqDto } from './dto/create-faq.dto'
import { UpdateFaqDto } from './dto/update-faq.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FaqRepository } from './faq.repostory'

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(FaqRepository) private faqRepository: FaqRepository,
  ) {}
  create(createFaqDto: CreateFaqDto) {
    const faq = this.faqRepository.create(createFaqDto)
    return this.faqRepository.save(faq)
  }

  findAll() {
    return this.faqRepository.find()
  }

  findOne(id: number) {
    return this.faqRepository.findOne({ where: { id } })
  }

  update(id: number, updateFaqDto: UpdateFaqDto) {
    return this.faqRepository.update(id, updateFaqDto)
  }

  remove(id: number) {
    return this.faqRepository.softDelete(id)
  }
}
