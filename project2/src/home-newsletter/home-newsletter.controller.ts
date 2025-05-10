import { Controller, Get, Query } from '@nestjs/common';
import { HomeNewsletterService } from './home-newsletter.service';

@Controller('home-newsletter')
export class HomeNewsletterController {
  constructor(private readonly homeNewsletterService: HomeNewsletterService) {}

  //NOTE: 학교 코드 조회 테스트 API
  @Get('school-code')
  async getSchoolCode(
    @Query('schoolName') schoolName: string,
    @Query('lctnName') lctnName: string,
    @Query('schoolKind') schoolKind: string,
  ) {
    return this.homeNewsletterService.getSchoolCode(
      schoolName,
      lctnName,
      schoolKind,
    );
  }
}
