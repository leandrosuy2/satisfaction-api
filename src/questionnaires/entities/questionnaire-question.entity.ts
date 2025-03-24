import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Questionnaire } from './questionnaire.entity';
import { Question } from '../../questions/entities/question.entity';

@Entity('questionnaire_questions')
export class QuestionnaireQuestion {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  id_questionario: string;

  @ApiProperty()
  @Column()
  id_pergunta: string;

  @ApiProperty()
  @Column()
  nome_pergunta: string;

  @ApiProperty()
  @Column({ default: true })
  status: boolean;

  @ApiProperty()
  @Column()
  ordem: number;

  @ApiProperty()
  @Column()
  user_add: string;

  @ApiProperty()
  @CreateDateColumn()
  date_add: Date;

  @ManyToOne(() => Questionnaire, questionnaire => questionnaire.perguntas)
  @JoinColumn({ name: 'id_questionario' })
  questionnaire: Questionnaire;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'id_pergunta' })
  pergunta: Question;
}