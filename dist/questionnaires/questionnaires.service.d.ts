import { Repository } from 'typeorm';
import { Questionnaire } from './entities/questionnaire.entity';
import { QuestionnaireQuestion } from './entities/questionnaire-question.entity';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { AddQuestionnaireQuestionDto } from './dto/add-questionnaire-question.dto';
import { QuestionsService } from '../questions/questions.service';
export declare class QuestionnairesService {
    private questionnaireRepository;
    private questionnaireQuestionRepository;
    private questionsService;
    constructor(questionnaireRepository: Repository<Questionnaire>, questionnaireQuestionRepository: Repository<QuestionnaireQuestion>, questionsService: QuestionsService);
    create(createQuestionnaireDto: CreateQuestionnaireDto): Promise<Questionnaire>;
    addQuestion(id: string, addQuestionDto: AddQuestionnaireQuestionDto): Promise<QuestionnaireQuestion>;
    findAll(): Promise<Questionnaire[]>;
    findOne(id: string): Promise<Questionnaire>;
    findByCompany(companyId: string): Promise<Questionnaire[]>;
    remove(id: string): Promise<Questionnaire>;
}
