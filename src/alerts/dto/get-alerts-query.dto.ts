import { IsDateString } from 'class-validator';

export class GetAlertQuery {
  @IsDateString()
  fromDate: string;

  @IsDateString()
  toDate: string;
}
