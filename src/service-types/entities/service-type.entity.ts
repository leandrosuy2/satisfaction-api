import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('service_types')
export class ServiceType {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty()
  @Column({ default: true })
  status: boolean;

  @ApiProperty()
  @Column()
  user_add: string;

  @ApiProperty()
  @Column()
  user_edt: string;

  @ApiProperty()
  @CreateDateColumn()
  date_add: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}