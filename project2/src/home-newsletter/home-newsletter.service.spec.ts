import { Test, TestingModule } from '@nestjs/testing';
import { HomeNewsletterService } from './home-newsletter.service';

describe('HomeNewsletterService', () => {
  let service: HomeNewsletterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeNewsletterService],
    }).compile();

    service = module.get<HomeNewsletterService>(HomeNewsletterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
