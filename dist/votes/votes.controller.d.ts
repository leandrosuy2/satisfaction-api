import { CreateVoteDto } from './dto/create-vote.dto';
import { VotesService } from './votes.service';
import { Request } from 'express';
export declare class VotesController {
    private readonly votesService;
    constructor(votesService: VotesService);
    create(createVoteDto: CreateVoteDto): Promise<import("./entities/vote.entity").Vote>;
    findAll(req: Request): Promise<import("./entities/vote.entity").Vote[]>;
    getAnalyticsRelatorio(companyId: string, startDate?: string, endDate?: string): Promise<{
        totalVotes: number;
        avaliacoesPorTipo: Record<import("./enums/rating-type.enum").RatingType, number>;
        percentuaisPorTipo: Record<import("./enums/rating-type.enum").RatingType, number>;
        votesByService: any;
        recentVotes: import("./entities/vote.entity").Vote[];
        votesByDay: any[];
        votosNegativos: import("./entities/vote.entity").Vote[];
    }>;
    getAnalytics(companyId: string): Promise<{
        totalVotes: number;
        avaliacoesPorTipo: Record<import("./enums/rating-type.enum").RatingType, number>;
        percentuaisPorTipo: Record<import("./enums/rating-type.enum").RatingType, number>;
        votesByService: any;
        recentVotes: import("./entities/vote.entity").Vote[];
        votesByDay: any[];
        votosNegativos: import("./entities/vote.entity").Vote[];
    }>;
    findOne(id: string): Promise<import("./entities/vote.entity").Vote>;
    findByEmpresa(id_empresa: string): Promise<import("./entities/vote.entity").Vote[]>;
    findByTipoServico(id_tipo_servico: string): Promise<import("./entities/vote.entity").Vote[]>;
    remove(id: string): Promise<import("./entities/vote.entity").Vote>;
}
