import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { QuestionResponse } from './entities/question-response.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateQuestionResponseDto } from './dto/create-question-response.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(QuestionResponse)
    private responseRepository: Repository<QuestionResponse>,
  ) {}

  create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(question);
  }

  async addResponse(id: string, createResponseDto: CreateQuestionResponseDto) {
    const question = await this.findOne(id);
    const response = this.responseRepository.create({
      ...createResponseDto,
      id_pergunta: question.id,
    });
    return this.responseRepository.save(response);
  }

  findAll() {
    return this.questionRepository.find({
      where: { status: true },
      relations: ['respostas'],
    });
  }

  async findOne(id: string) {
    const question = await this.questionRepository.findOne({
      where: { id, status: true },
      relations: ['respostas'],
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }

  findResponses(id: string) {
    return this.responseRepository.find({
      where: { id_pergunta: id, status: true },
      order: { ordem: 'ASC' },
    });
  }

  async remove(id: string) {
    const question = await this.findOne(id);
    question.status = false;
    return this.questionRepository.save(question);
  }
}