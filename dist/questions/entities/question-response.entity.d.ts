import { Question } from './question.entity';
export declare class QuestionResponse {
    id: string;
    id_pergunta: string;
    ordem: number;
    nome: string;
    valor: number;
    image: string;
    status: boolean;
    user_add: string;
    date_add: Date;
    question: Question;
}
