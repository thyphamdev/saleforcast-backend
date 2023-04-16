import { Controller, Get, Query } from '@nestjs/common';
import { WheatherService } from './wheather.service';
import { GetWheatherForecastQuery } from './dto/get-wheather-forecast-query.dto';

@Controller('wheatherforecast')
export class WheatherController {
  constructor(private readonly wheatherService: WheatherService) {}

  @Get()
  getWheatherForecast(@Query() query: GetWheatherForecastQuery) {
    const { fromDate, toDate, city } = query;
    return this.wheatherService.getWheatherForecast(fromDate, toDate, city);
  }
}
