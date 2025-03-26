import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('service_types')
export class ServiceType {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  id_empresa: string;

  @ApiProperty()
  @Column()
  tipo_servico: string;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty()
  @Column()
  hora_inicio: string;

  @ApiProperty()
  @Column()
  hora_final: string;

  @ApiProperty()
  @Column({ default: true })
  status: boolean;

  @ApiProperty()
  @Column()
  user_add: string;

  @ApiProperty()
  @CreateDateColumn()
  date_add: Date;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}