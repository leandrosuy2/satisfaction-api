import { CreateVoteDto } from './dto/create-vote.dto';
import { VotesService } from './votes.service';
export declare class VotesController {
    private readonly votesService;
    constructor(votesService: VotesService);
    create(createVoteDto: CreateVoteDto): Promise<import("./entities/vote.entity").Vote>;
    findAll(): Promise<import("./entities/vote.entity").Vote[]>;
    getAnalytics(companyId: string): Promise<{
        totalVotes: number;
        avaliacoesPorTipo: Record<import("./enums/rating-type.enum").RatingType, number>;
        percentuaisPorTipo: Record<import("./enums/rating-type.enum").RatingType, number>;
        votesByService: Record<string, {
            total: number;
            avaliacoes: Record<import("./enums/rating-type.enum").RatingType, number>;
            percentuais: Record<import("./enums/rating-type.enum").RatingType, number>;
            votes: import("./entities/vote.entity").Vote[];
        }>;
        recentVotes: import("./entities/vote.entity").Vote[];
    }>;
    findOne(id: string): Promise<import("./entities/vote.entity").Vote>;
    findByEmpresa(id_empresa: string): Promise<import("./entities/vote.entity").Vote[]>;
    findByTipoServico(id_tipo_servico: string): Promise<import("./entities/vote.entity").Vote[]>;
    remove(id: string): Promise<import("./entities/vote.entity").Vote>;
}
