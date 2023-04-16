import { IsDateString } from 'class-validator';

export class GetSalesForecastQuery {
  @IsDateString()
  fromDate: string;

  @IsDateString()
  toDate: string;
}
