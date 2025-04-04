import { CompanyService } from './company-service.entity';
import { LineType } from '../enums/line-type.enum';
import { User } from '../../users/entities/user.entity';
export declare class Company {
    id: string;
    nome: string;
    razao_social: string;
    logo: string;
    email: string;
    telcom: string;
    telcel: string;
    cnpj: string;
    qt_funcionarios: number;
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    versao: number;
    resto_ingesta: number;
    status: boolean;
    user_edt: string;
    linha: LineType;
    servicos: CompanyService[];
    usuarios: User[];
    created_at: Date;
    updated_at: Date;
}
