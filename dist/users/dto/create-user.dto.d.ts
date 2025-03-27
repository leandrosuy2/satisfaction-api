import { AccessProfile } from '../enums/access-profile.enum';
export declare class CreateUserDto {
    nome: string;
    username: string;
    password: string;
    image?: string;
    email: string;
    telcel?: string;
    id_perfil?: string;
    setor?: string;
    cargo: string;
    perfil_acesso: AccessProfile;
    empresas?: {
        id_empresa: string;
        nome_empresa: string;
        status: boolean;
    }[];
}
