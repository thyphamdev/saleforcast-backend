import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { SalesModule } from '../sales/sales.module';
import { WheatherModule } from '../wheather/wheather.module';

@Module({
  imports: [SalesModule, WheatherModule],
  controllers: [AlertsController],
  providers: [AlertsService],
})
export class AlertsModule {}
