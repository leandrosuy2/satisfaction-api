import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../../companies/entities/company.entity';
import { QuestionnaireQuestion } from './questionnaire-question.entity';

@Entity('questionnaires')
export class Questionnaire {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  id_empresa: string;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty()
  @Column({ default: true })
  status: boolean;

  @ApiProperty()
  @Column()
  user_add: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'id_empresa' })
  empresa: Company;

  @ApiProperty({ type: () => QuestionnaireQuestion })
  @OneToMany(() => QuestionnaireQuestion, question => question.questionnaire)
  perguntas: QuestionnaireQuestion[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}