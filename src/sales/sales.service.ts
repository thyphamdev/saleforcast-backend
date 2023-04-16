import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private usersRepository: Repository<Sale>,
  ) {}

  findByDate(fromDate: string, toDate: string) {
    return this.usersRepository.find({
      where: {
        date: Between(fromDate, toDate),
      },
      order: {
        date: 'desc',
      },
    });
  }
}
