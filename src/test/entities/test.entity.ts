import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';

@Entity()
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 225 })
  name: string;

  @Column({ type: 'varchar', length: 225 })
  desc: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  // @Column()
  // age: number;

  // @Column()
  // password: string;


  // @Column()
  // updateTime: Date;

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
}
