import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VotesGateway } from './votes.gateway';
import { RatingType } from './enums/rating-type.enum';
export declare class VotesService {
    private voteRepository;
    private votesGateway;
    constructor(voteRepository: Repository<Vote>, votesGateway: VotesGateway);
    create(createVoteDto: CreateVoteDto): Promise<Vote>;
    findAll(): Promise<Vote[]>;
    findOne(id_voto: string): Promise<Vote>;
    findByEmpresa(id_empresa: string): Promise<Vote[]>;
    findByTipoServico(id_tipo_servico: string): Promise<Vote[]>;
    remove(id_voto: string): Promise<Vote>;
    getAnalytics(companyId: string): Promise<{
        totalVotes: number;
        avaliacoesPorTipo: Record<RatingType, number>;
        percentuaisPorTipo: Record<RatingType, number>;
        votesByService: Record<string, {
            total: number;
            avaliacoes: Record<RatingType, number>;
            percentuais: Record<RatingType, number>;
            votes: Vote[];
        }>;
        recentVotes: Vote[];
    }>;
}
