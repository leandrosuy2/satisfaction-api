import { Company } from '../../companies/entities/company.entity';
import { AccessProfile } from '../enums/access-profile.enum';
import { UserPermission } from './user-permission.entity';
export declare class User {
    id: string;
    nome: string;
    username: string;
    password: string;
    image?: string;
    email: string;
    telcel?: string;
    id_perfil?: string;
    setor?: string;
    cargo?: string;
    date_acs: Date;
    status: boolean;
    perfil_acesso: AccessProfile;
    empresas: Company[];
    permissions: UserPermission[];
    created_at: Date;
    updated_at: Date;
}
