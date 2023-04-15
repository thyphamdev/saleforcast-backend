import { Controller, Get, Query } from '@nestjs/common';
import { SalesService } from './sales.service';
import { GetSalesForecastQuery } from './dto/get-sales-forecast-query.dto';

@Controller('salesforecast')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  findByDate(@Query() query: GetSalesForecastQuery) {
    const { fromDate, toDate } = query;
    return this.salesService.findByDate(fromDate, toDate);
  }
}
