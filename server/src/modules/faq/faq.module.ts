import { Module } from '@nestjs/common'
import { FaqService } from './faq.service'
import { FaqController } from './faq.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FaqRepository } from './faq.repostory'
import { Faq } from './entities/faq.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Faq, FaqRepository])],
  controllers: [FaqController],
  providers: [FaqService, FaqRepository],
})
export class FaqModule {}
