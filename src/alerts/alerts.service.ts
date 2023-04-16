import { Injectable } from '@nestjs/common';
import { SalesService } from '../sales/sales.service';
import { WheatherService } from '../wheather/wheather.service';
import { WheatherForecastResult } from '../wheather/wheather.service';

@Injectable()
export class AlertsService {
  constructor(
    private salesService: SalesService,
    private wheatherService: WheatherService,
  ) {}

  sortByDate = (a, b) => (a.date > b.date ? 1 : -1);

  private async getWhereForecastForCity(
    wheatherForcaseByCity: Record<string, WheatherForecastResult[]>,
    fromDate: string,
    toDate: string,
    city: string,
  ) {
    wheatherForcaseByCity[city] =
      await this.wheatherService.getWheatherForecast(fromDate, toDate, city);
  }

  async getCloseStoreAlert(fromDate: string, toDate: string) {
    const salesForecastByCity = await this.salesService.findByDate(
      fromDate,
      toDate,
    );

    const cities = Object.keys(salesForecastByCity);

    const wheatherForcaseByCity: Record<string, WheatherForecastResult[]> = {};
    await Promise.all(
      cities.map((city: string) =>
        this.getWhereForecastForCity(
          wheatherForcaseByCity,
          fromDate,
          toDate,
          city,
        ),
      ),
    );

    const closedDateByCity: Record<string, string[]> = {};

    cities.map((city) => {
      const salesforecast = salesForecastByCity[city].sort(this.sortByDate);
      const wheatherforecast = wheatherForcaseByCity[city].sort(
        this.sortByDate,
      );
      let lowSaleSeq = 0;
      let badWheatherSeq = 0;
      let closedStoreSeq = 0;
      closedDateByCity[city] = [];

      for (let i = 0; i < salesforecast.length; i++) {
        if (Math.floor(salesforecast[i].forecastedSalesQty) < 1000) {
          lowSaleSeq++;
        } else {
          lowSaleSeq = 0;
        }

        if (
          Math.floor(salesforecast[i].forecastedSalesQty) <= 1500 &&
          wheatherforecast[i].temperature < 5
        ) {
          badWheatherSeq++;
        } else {
          badWheatherSeq = 0;
        }

        if ((lowSaleSeq >= 3 || badWheatherSeq >= 3) && closedStoreSeq < 3) {
          closedDateByCity[city].push(salesforecast[i - 2].date);
          closedStoreSeq++;
        } else if (closedStoreSeq >= 3) {
          closedStoreSeq = 0;
        }
      }
    });

    return closedDateByCity;
  }
}
