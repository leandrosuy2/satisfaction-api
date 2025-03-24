import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Question } from './question.entity';

@Entity('question_responses')
export class QuestionResponse {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  id_pergunta: string;

  @ApiProperty()
  @Column()
  ordem: number;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty()
  @Column({ default: 0 })
  valor: number;

  @ApiProperty()
  @Column({ nullable: true })
  image: string;

  @ApiProperty()
  @Column({ default: true })
  status: boolean;

  @ApiProperty()
  @Column()
  user_add: string;

  @ApiProperty()
  @CreateDateColumn()
  date_add: Date;

  @ManyToOne(() => Question, question => question.respostas)
  @JoinColumn({ name: 'id_pergunta' })
  question: Question;
}