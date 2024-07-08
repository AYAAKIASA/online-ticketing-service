import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Performance {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column()
  category!: string;

  @Column()
  location!: string;

  @Column()
  price!: number;

  @Column()
  image_url!: string;

  @Column('simple-array')
  dates!: string[]; // JSON 형식으로 저장할 필요 없이 간단 배열로 저장

  @Column()
  total_seats!: number;
}