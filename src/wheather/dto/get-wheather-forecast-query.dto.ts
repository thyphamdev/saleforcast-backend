import { IsDateString, IsString } from 'class-validator';

export class GetWheatherForecastQuery {
  @IsString()
  city: string;

  @IsDateString()
  fromDate: string;

  @IsDateString()
  toDate: string;
}
