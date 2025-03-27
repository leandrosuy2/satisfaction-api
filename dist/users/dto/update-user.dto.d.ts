import { AccessProfile } from '../enums/access-profile.enum';
export declare class UpdateUserDto {
    nome?: string;
    username?: string;
    email?: string;
    telcel?: string;
    id_perfil?: string;
    setor?: string;
    cargo?: string;
    perfil_acesso?: AccessProfile;
    image?: string;
}
