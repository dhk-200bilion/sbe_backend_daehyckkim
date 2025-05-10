import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeNewsletterController } from './home-newsletter/home-newsletter.controller';
import { HomeNewsletterModule } from './home-newsletter/home-newsletter.module';

@Module({
  imports: [HomeNewsletterModule],
  controllers: [AppController, HomeNewsletterController],
  providers: [AppService],
})
export class AppModule {}
