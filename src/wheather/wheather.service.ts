import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WheatherService {
  constructor(private configService: ConfigService) {}

  async getWheatherForecast(fromDate: string, toDate: string, city: string) {
    const apiKey = this.configService.get<string>('WHEATHER_SERVICE_API_KEY');

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${fromDate}/${toDate}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`,
    );

    if (!response.ok) {
      throw new HttpException(
        'could not fetch wheather data',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const wheatherForecastResult = await response.json();

    return wheatherForecastResult.days.map((day) => ({
      date: day.datetime,
      temperature: day.temp,
    }));
  }
}
