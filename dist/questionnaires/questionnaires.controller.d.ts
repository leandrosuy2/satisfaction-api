import { QuestionnairesService } from './questionnaires.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { AddQuestionnaireQuestionDto } from './dto/add-questionnaire-question.dto';
export declare class QuestionnairesController {
    private readonly questionnairesService;
    constructor(questionnairesService: QuestionnairesService);
    create(createQuestionnaireDto: CreateQuestionnaireDto): Promise<import("./entities/questionnaire.entity").Questionnaire>;
    addQuestion(id: string, addQuestionDto: AddQuestionnaireQuestionDto): Promise<import("./entities/questionnaire-question.entity").QuestionnaireQuestion>;
    findAll(): Promise<import("./entities/questionnaire.entity").Questionnaire[]>;
    findOne(id: string): Promise<import("./entities/questionnaire.entity").Questionnaire>;
    findByCompany(companyId: string): Promise<import("./entities/questionnaire.entity").Questionnaire[]>;
    remove(id: string): Promise<import("./entities/questionnaire.entity").Questionnaire>;
}
