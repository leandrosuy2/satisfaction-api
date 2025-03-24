import { Company } from '../../companies/entities/company.entity';
import { QuestionnaireQuestion } from './questionnaire-question.entity';
export declare class Questionnaire {
    id: string;
    id_empresa: string;
    nome: string;
    status: boolean;
    user_add: string;
    empresa: Company;
    perguntas: QuestionnaireQuestion[];
    created_at: Date;
    updated_at: Date;
}
