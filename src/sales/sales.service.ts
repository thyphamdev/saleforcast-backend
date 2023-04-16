import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  async findByDate(fromDate: string, toDate: string) {
    const salesForecastByCity: Record<string, Sale[]> = {};

    const allSalesForecast = await this.salesRepository.find({
      where: {
        date: Between(fromDate, toDate),
      },
      order: {
        date: 'desc',
      },
    });

    allSalesForecast.map((saleFc) =>
      salesForecastByCity[saleFc.location]
        ? salesForecastByCity[saleFc.location].push(saleFc)
        : (salesForecastByCity[saleFc.location] = [saleFc]),
    );

    return salesForecastByCity;
  }
}
