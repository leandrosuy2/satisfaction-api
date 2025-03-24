import { QuestionResponse } from './question-response.entity';
export declare class Question {
    id: string;
    nome: string;
    status: boolean;
    user_add: string;
    respostas: QuestionResponse[];
    created_at: Date;
    updated_at: Date;
}
