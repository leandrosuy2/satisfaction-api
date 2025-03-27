import { RatingType } from '../enums/rating-type.enum';
export declare class CreateVoteDto {
    id_empresa: string;
    id_tipo_servico?: string;
    avaliacao: RatingType;
    comentario?: string;
}
