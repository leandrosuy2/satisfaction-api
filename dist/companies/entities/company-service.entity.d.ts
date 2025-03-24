import { Company } from './company.entity';
export declare class CompanyService {
    id: string;
    id_empresa: string;
    tipo_servico: string;
    nome: string;
    hora_inicio: string;
    hora_final: string;
    status: boolean;
    user_add: string;
    date_add: Date;
    company: Company;
}
