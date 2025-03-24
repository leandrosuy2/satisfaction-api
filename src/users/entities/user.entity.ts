import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../companies/entities/company.entity';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ nullable: true })
  image: string;

  @ApiProperty()
  @Column({ nullable: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  telcel: string;

  @ApiProperty()
  @Column()
  id_perfil: string;

  @ApiProperty()
  @Column({ nullable: true })
  setor: string;

  @ApiProperty()
  @Column()
  date_acs: Date;

  @ApiProperty()
  @Column({ default: true })
  status: boolean;

  @ApiProperty()
  @Column('jsonb', { default: [] })
  perfil_acesso: { nome: string; status: boolean }[];

  @ApiProperty()
  @Column('jsonb', { default: [] })
  empresas: { id_empresa: string; nome_empresa: string; status: boolean }[];

  @ManyToMany(() => Company)
  @JoinTable({
    name: 'user_companies',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'company_id', referencedColumnName: 'id' },
  })
  companiesRelation: Company[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}