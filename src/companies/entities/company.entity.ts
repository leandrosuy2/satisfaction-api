import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyService } from './company-service.entity';

@Entity('companies')
export class Company {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty()
  @Column()
  razao_social: string;

  @ApiProperty()
  @Column({ nullable: true })
  logo: string;

  @ApiProperty()
  @Column({ nullable: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  telcom: string;

  @ApiProperty()
  @Column({ nullable: true })
  telcel: string;

  @ApiProperty()
  @Column({ nullable: true })
  cnpj: string;

  @ApiProperty()
  @Column({ default: 0 })
  qt_funcionarios: number;

  @ApiProperty()
  @Column({ nullable: true })
  cep: string;

  @ApiProperty()
  @Column({ nullable: true })
  rua: string;

  @ApiProperty()
  @Column({ nullable: true })
  numero: string;

  @ApiProperty()
  @Column({ nullable: true })
  bairro: string;

  @ApiProperty()
  @Column({ nullable: true })
  cidade: string;

  @ApiProperty()
  @Column({ nullable: true })
  estado: string;

  @ApiProperty()
  @Column({ default: 1 })
  versao: number;

  @ApiProperty()
  @Column({ default: 0 })
  resto_ingesta: number;

  @ApiProperty()
  @Column({ default: true })
  status: boolean;

  @ApiProperty()
  @Column()
  user_edt: string;

  @ApiProperty({ type: () => CompanyService })
  @OneToMany(() => CompanyService, service => service.company)
  servicos: CompanyService[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}