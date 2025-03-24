import { Questionnaire } from './questionnaire.entity';
import { Question } from '../../questions/entities/question.entity';
export declare class QuestionnaireQuestion {
    id: string;
    id_questionario: string;
    id_pergunta: string;
    nome_pergunta: string;
    status: boolean;
    ordem: number;
    user_add: string;
    date_add: Date;
    questionnaire: Questionnaire;
    pergunta: Question;
}
