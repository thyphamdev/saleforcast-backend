import { AlertsService } from './alerts.service';
import { SalesService } from '../sales/sales.service';
import { WheatherService } from '../wheather/wheather.service';
import { Sale } from '../sales/entities/sale.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

describe('AlertsService', () => {
  let salesRepo: Repository<Sale>;
  let salesService: SalesService;
  let configService: ConfigService;
  let wheatherService: WheatherService;
  let alertsService: AlertsService;

  beforeEach(() => {
    salesService = new SalesService(salesRepo);
    wheatherService = new WheatherService(configService);
    alertsService = new AlertsService(salesService, wheatherService);
  });

  describe('when sale qty less than 1000 for 3 subsequent days', () => {
    const fromDate = '2023-04-01';
    const toDate = '2023-04-03';

    beforeEach(() => {
      jest.spyOn(salesService, 'findByDate').mockResolvedValue({
        Hamburg: [
          {
            id: 71,
            location: 'Hamburg',
            forecastedSalesQty: 583,
            date: '2023-04-03',
          },
          {
            id: 70,
            location: 'Hamburg',
            forecastedSalesQty: 2,
            date: '2023-04-02',
          },
          {
            id: 69,
            location: 'Hamburg',
            forecastedSalesQty: 151,
            date: '2023-04-01',
          },
        ],
        Munich: [
          {
            id: 71,
            location: 'Munich',
            forecastedSalesQty: 583,
            date: '2023-04-03',
          },
          {
            id: 70,
            location: 'Munich',
            forecastedSalesQty: 2,
            date: '2023-04-02',
          },
          {
            id: 69,
            location: 'Munich',
            forecastedSalesQty: 151,
            date: '2023-04-01',
          },
        ],
      });
      jest.spyOn(wheatherService, 'getWheatherForecast').mockResolvedValue([
        {
          date: '2023-04-01',
          temperature: 6.9,
        },
        {
          date: '2023-04-02',
          temperature: 4,
        },
        {
          date: '2023-04-03',
          temperature: 3,
        },
      ]);
    });

    it('should alert', async () => {
      const result = await alertsService.getCloseStoreAlert(fromDate, toDate);

      expect(result).toStrictEqual({
        Hamburg: ['2023-04-01'],
        Munich: ['2023-04-01'],
      });
    });
  });

  describe('when closed days are more than 3 subsequent days', () => {
    const fromDate = '2023-04-01';
    const toDate = '2023-04-07';

    beforeEach(() => {
      jest.spyOn(salesService, 'findByDate').mockResolvedValue({
        Hamburg: [
          {
            id: 71,
            location: 'Hamburg',
            forecastedSalesQty: 583,
            date: '2023-04-07',
          },
          {
            id: 71,
            location: 'Hamburg',
            forecastedSalesQty: 583,
            date: '2023-04-06',
          },
          {
            id: 71,
            location: 'Hamburg',
            forecastedSalesQty: 583,
            date: '2023-04-05',
          },
          {
            id: 71,
            location: 'Hamburg',
            forecastedSalesQty: 583,
            date: '2023-04-04',
          },
          {
            id: 71,
            location: 'Hamburg',
            forecastedSalesQty: 583,
            date: '2023-04-03',
          },
          {
            id: 70,
            location: 'Hamburg',
            forecastedSalesQty: 2,
            date: '2023-04-02',
          },
          {
            id: 69,
            location: 'Hamburg',
            forecastedSalesQty: 151,
            date: '2023-04-01',
          },
        ],
      });
      jest.spyOn(wheatherService, 'getWheatherForecast').mockResolvedValue([
        {
          date: '2023-04-01',
          temperature: 6.9,
        },
        {
          date: '2023-04-02',
          temperature: 4,
        },
        {
          date: '2023-04-03',
          temperature: 3,
        },
        {
          date: '2023-04-04',
          temperature: 3,
        },
        {
          date: '2023-04-05',
          temperature: 3,
        },
        {
          date: '2023-04-06',
          temperature: 3,
        },
        {
          date: '2023-04-07',
          temperature: 3,
        },
      ]);
    });

    it('should alert to close store only 3 subsequent days', async () => {
      const result = await alertsService.getCloseStoreAlert(fromDate, toDate);

      expect(result).toStrictEqual({
        Hamburg: ['2023-04-01', '2023-04-02', '2023-04-03', '2023-04-05'],
      });
    });
  });
});
