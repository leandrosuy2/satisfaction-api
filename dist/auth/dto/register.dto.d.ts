import { AccessProfile } from '../../users/enums/access-profile.enum';
export declare class RegisterDto {
    username: string;
    password: string;
    nome: string;
    email: string;
    perfil_acesso: AccessProfile;
    empresas: {
        id_empresa: string;
        nome_empresa: string;
        status: boolean;
    }[];
    image?: string;
    telcel?: string;
    setor?: string;
    cargo?: string;
}
