import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceType } from '../../service-types/entities/service-type.entity';
import { RatingType } from '../enums/rating-type.enum';

@Entity('votes')
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'ID único do voto' })
  id_voto: string;

  @Column()
  @ApiProperty({ description: 'ID da empresa' })
  id_empresa: string;

  @Column()
  @ApiProperty({ description: 'ID do tipo de serviço' })
  id_tipo_servico: string;

  @ManyToOne(() => ServiceType)
  @JoinColumn({ name: 'id_tipo_servico' })
  serviceType: ServiceType;

  @Column({
    type: 'enum',
    enum: RatingType,
    default: RatingType.REGULAR
  })
  @ApiProperty({ 
    description: 'Avaliação do serviço',
    enum: RatingType,
    example: RatingType.OTIMO
  })
  avaliacao: RatingType;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Comentário opcional sobre o voto' })
  comentario?: string;

  @Column({ default: true })
  @ApiProperty({ description: 'Status do voto (ativo/inativo)' })
  status: boolean;

  @CreateDateColumn()
  @ApiProperty({ description: 'Data de criação do voto' })
  momento_voto: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Data da última atualização do voto' })
  updated_at: Date;
} 