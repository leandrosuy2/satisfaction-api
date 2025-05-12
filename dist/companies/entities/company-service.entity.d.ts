import { Company } from './company.entity';
import { Vote } from '../../votes/entities/vote.entity';
export declare class CompanyService {
    id: string;
    id_empresa: string;
    tipo_servico: string;
    nome: string;
    hora_inicio: string;
    hora_final: string;
    status: boolean;
    user_add: string;
    qtd_ref: number;
    date_add: Date;
    company: Company;
    votes: Vote[];
}
