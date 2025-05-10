import { Test, TestingModule } from '@nestjs/testing';
import { HomeNewsletterController } from './home-newsletter.controller';

describe('HomeNewsletterController', () => {
  let controller: HomeNewsletterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeNewsletterController],
    }).compile();

    controller = module.get<HomeNewsletterController>(HomeNewsletterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
