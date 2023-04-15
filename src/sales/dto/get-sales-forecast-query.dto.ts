import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class GetSalesForecastQuery {
  @IsDate()
  @Type(() => Date)
  fromDate: Date;

  @IsDate()
  @Type(() => Date)
  toDate: Date;
}
