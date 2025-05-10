import {
  Controller,
  Get,
  Query,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { HomeNewsletterDto } from './dto/home-newsletter.dto';
import { HomeNewsletterService } from './home-newsletter.service';

@Controller('home-newsletter')
export class HomeNewsletterController {
  constructor(private readonly homeNewsletterService: HomeNewsletterService) {}

  //NOTE: 학교 코드 조회 테스트 API
  @Get()
  async getHomeNewsletter(
    @Req() req,
    @Query(ValidationPipe) homeNewsletterDto: HomeNewsletterDto,
    @Res() res,
  ): Promise<any> {
    const result =
      await this.homeNewsletterService.getHomeNewsletter(homeNewsletterDto);
    return res.send(result);
  }
}
