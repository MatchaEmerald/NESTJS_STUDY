import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
  OneToMany,
} from 'typeorm';
import { Tags } from './tags.entity';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225 })
  name: string;

  @Column({ type: 'varchar', length: 225 })
  desc: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @OneToMany(() => Tags, (tags) => tags.test)
  tags: Tags[];
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
