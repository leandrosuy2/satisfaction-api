import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../companies/entities/company.entity';
import { AccessProfile } from '../enums/access-profile.enum';
import { UserPermission } from './user-permission.entity';

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
  image?: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  telcel?: string;

  @ApiProperty()
  @Column({ nullable: true })
  id_perfil?: string;

  @ApiProperty()
  @Column({ nullable: true })
  setor?: string;

  @ApiProperty()
  @Column({ nullable: true })
  cargo?: string;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_acs: Date;

  @ApiProperty()
  @Column({ default: true })
  status: boolean;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: AccessProfile,
    default: AccessProfile.CLIENTE
  })
  perfil_acesso: AccessProfile;

  @ApiProperty({ type: () => Company })
  @ManyToMany(() => Company, company => company.usuarios)
  empresas: Company[];

  @ApiProperty({ type: () => UserPermission })
  @OneToMany(() => UserPermission, permission => permission.user)
  permissions: UserPermission[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}