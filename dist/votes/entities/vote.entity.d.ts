import { ServiceType } from '../../service-types/entities/service-type.entity';
import { RatingType } from '../enums/rating-type.enum';
export declare class Vote {
    id_voto: string;
    id_empresa: string;
    id_tipo_servico: string;
    serviceType: ServiceType;
    avaliacao: RatingType;
    comentario?: string;
    status: boolean;
    momento_voto: Date;
    updated_at: Date;
}
