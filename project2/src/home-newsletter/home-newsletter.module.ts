import { Module } from '@nestjs/common';
import { HomeNewsletterController } from './home-newsletter.controller';
import { HomeNewsletterService } from './home-newsletter.service';

@Module({
  controllers: [HomeNewsletterController],
  providers: [HomeNewsletterService],
})
export class HomeNewsletterModule {}
