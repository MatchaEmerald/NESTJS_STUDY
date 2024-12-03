import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Test } from './test.entity';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225 })
  name: string;

  @ManyToOne(() => Test)
  test: Test;
}

// @Column({
//   type: 'enum',
//   enum: [1, 2, 3],
//   default: 1,
// })
// xxEnum: number;

// @Column('simple-array')
// tags: string[];

// @Column('simple-json')
// json: { name: string; age: number };
