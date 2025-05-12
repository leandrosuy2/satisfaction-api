import { RatingType } from '../enums/rating-type.enum';
import { CompanyService } from '../../companies/entities/company-service.entity';
export declare class Vote {
    id_voto: string;
    id_empresa: string;
    id_tipo_servico: string;
    avaliacao: RatingType;
    comentario?: string;
    status: boolean;
    linha?: string;
    momento_voto: Date;
    updated_at: Date;
    tipo_servico: CompanyService;
}
