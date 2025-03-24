import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateQuestionResponseDto } from './dto/create-question-response.dto';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    create(createQuestionDto: CreateQuestionDto): Promise<import("./entities/question.entity").Question>;
    addResponse(id: string, createResponseDto: CreateQuestionResponseDto): Promise<import("./entities/question-response.entity").QuestionResponse>;
    findAll(): Promise<import("./entities/question.entity").Question[]>;
    findOne(id: string): Promise<import("./entities/question.entity").Question>;
    findResponses(id: string): Promise<import("./entities/question-response.entity").QuestionResponse[]>;
    remove(id: string): Promise<import("./entities/question.entity").Question>;
}
