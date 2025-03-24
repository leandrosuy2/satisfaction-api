import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questionnaire } from './entities/questionnaire.entity';
import { QuestionnaireQuestion } from './entities/questionnaire-question.entity';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { AddQuestionnaireQuestionDto } from './dto/add-questionnaire-question.dto';
import { QuestionsService } from '../questions/questions.service';

@Injectable()
export class QuestionnairesService {
  constructor(
    @InjectRepository(Questionnaire)
    private questionnaireRepository: Repository<Questionnaire>,
    @InjectRepository(QuestionnaireQuestion)
    private questionnaireQuestionRepository: Repository<QuestionnaireQuestion>,
    private questionsService: QuestionsService,
  ) {}

  create(createQuestionnaireDto: CreateQuestionnaireDto) {
    const questionnaire = this.questionnaireRepository.create(createQuestionnaireDto);
    return this.questionnaireRepository.save(questionnaire);
  }

  async addQuestion(id: string, addQuestionDto: AddQuestionnaireQuestionDto) {
    const questionnaire = await this.findOne(id);
    const question = await this.questionsService.findOne(addQuestionDto.id_pergunta);

    const questionnaireQuestion = this.questionnaireQuestionRepository.create({
      ...addQuestionDto,
      id_questionario: questionnaire.id,
      nome_pergunta: question.nome,
    });

    return this.questionnaireQuestionRepository.save(questionnaireQuestion);
  }

  findAll() {
    return this.questionnaireRepository.find({
      where: { status: true },
      relations: ['perguntas', 'empresa'],
    });
  }

  async findOne(id: string) {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: { id, status: true },
      relations: ['perguntas', 'empresa'],
    });

    if (!questionnaire) {
      throw new NotFoundException(`Questionnaire with ID ${id} not found`);
    }

    return questionnaire;
  }

  findByCompany(companyId: string) {
    return this.questionnaireRepository.find({
      where: { id_empresa: companyId, status: true },
      relations: ['perguntas'],
    });
  }

  async remove(id: string) {
    const questionnaire = await this.findOne(id);
    questionnaire.status = false;
    return this.questionnaireRepository.save(questionnaire);
  }
}