import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HomeNewsletterModule } from './home-newsletter/home-newsletter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역적으로 사용 가능하도록 설정
    }),
    HomeNewsletterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
