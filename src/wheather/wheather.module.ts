import { Module } from '@nestjs/common';
import { WheatherService } from './wheather.service';
import { WheatherController } from './wheather.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [WheatherController],
  providers: [WheatherService],
  exports: [WheatherService],
})
export class WheatherModule {}
