import { AccessProfile } from '../enums/access-profile.enum';
export declare class UpdateProfileDto {
    nome?: string;
    image?: string;
    email?: string;
    telcel?: string;
    setor?: string;
    perfil_acesso?: AccessProfile;
    empresas?: {
        id_empresa: string;
        nome_empresa: string;
        status: boolean;
    }[];
}
