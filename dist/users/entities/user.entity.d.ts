import { Company } from '../../companies/entities/company.entity';
import { AccessProfile } from '../enums/access-profile.enum';
export declare class User {
    id: string;
    nome: string;
    username: string;
    password: string;
    image: string;
    email: string;
    telcel: string;
    id_perfil: string;
    setor: string;
    date_acs: Date;
    status: boolean;
    perfil_acesso: AccessProfile;
    empresas: {
        id_empresa: string;
        nome_empresa: string;
        status: boolean;
    }[];
    companiesRelation: Company[];
    created_at: Date;
    updated_at: Date;
}
