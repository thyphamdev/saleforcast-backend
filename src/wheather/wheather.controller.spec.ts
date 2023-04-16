import { Test, TestingModule } from '@nestjs/testing';
import { WheatherController } from './wheather.controller';
import { WheatherService } from './wheather.service';

describe('WheatherController', () => {
  let controller: WheatherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WheatherController],
      providers: [WheatherService],
    }).compile();

    controller = module.get<WheatherController>(WheatherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
