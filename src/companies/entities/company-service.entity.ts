import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from './company.entity';
import { Vote } from '../../votes/entities/vote.entity'; // ajuste o caminho se necessário

@Entity('company_services')
export class CompanyService {
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
  @Column({ type: 'int', default: 0 })
  qtd_ref: number;

  @ApiProperty()
  @CreateDateColumn()
  date_add: Date;

  @ManyToOne(() => Company, company => company.servicos)
  @JoinColumn({ name: 'id_empresa' })
  company: Company;

  @OneToMany(() => Vote, (vote) => vote.tipo_servico)
  votes: Vote[];
}