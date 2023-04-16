import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { GetAlertQuery } from './dto/get-alerts-query.dto';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  getCloseStoreAlert(@Query() query: GetAlertQuery) {
    const { fromDate, toDate } = query;
    return this.alertsService.getCloseStoreAlert(fromDate, toDate);
  }
}
