import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'forecasts' })
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column({ name: 'forecasted_sales_quantity' })
  forecastedSalesQty: number;

  @Column()
  date: Date;
}
