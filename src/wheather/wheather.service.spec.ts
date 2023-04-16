import { Test, TestingModule } from '@nestjs/testing';
import { WheatherService } from './wheather.service';

describe('WheatherService', () => {
  let service: WheatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WheatherService],
    }).compile();

    service = module.get<WheatherService>(WheatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
