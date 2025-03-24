import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { QuestionResponse } from './entities/question-response.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateQuestionResponseDto } from './dto/create-question-response.dto';
export declare class QuestionsService {
    private questionRepository;
    private responseRepository;
    constructor(questionRepository: Repository<Question>, responseRepository: Repository<QuestionResponse>);
    create(createQuestionDto: CreateQuestionDto): Promise<Question>;
    addResponse(id: string, createResponseDto: CreateQuestionResponseDto): Promise<QuestionResponse>;
    findAll(): Promise<Question[]>;
    findOne(id: string): Promise<Question>;
    findResponses(id: string): Promise<QuestionResponse[]>;
    remove(id: string): Promise<Question>;
}
