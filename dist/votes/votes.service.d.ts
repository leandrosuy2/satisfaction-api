import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VotesGateway } from './votes.gateway';
import { RatingType } from './enums/rating-type.enum';
import { ServiceType } from '../service-types/entities/service-type.entity';
import { ServiceTypesService } from '../service-types/service-types.service';
import { Company } from '../companies/entities/company.entity';
export declare class VotesService {
    private voteRepository;
    private serviceTypeRepository;
    private serviceTypesService;
    private votesGateway;
    private companyRepository;
    constructor(voteRepository: Repository<Vote>, serviceTypeRepository: Repository<ServiceType>, serviceTypesService: ServiceTypesService, votesGateway: VotesGateway, companyRepository: Repository<Company>);
    create(createVoteDto: CreateVoteDto): Promise<Vote>;
    findAll(): Promise<Vote[]>;
    findOne(id_voto: string): Promise<Vote>;
    findByEmpresa(id_empresa: string): Promise<Vote[]>;
    findByTipoServico(id_tipo_servico: string): Promise<Vote[]>;
    remove(id_voto: string): Promise<Vote>;
    getAnalytics(companyId: string, startDate?: string, endDate?: string): Promise<{
        totalVotes: number;
        avaliacoesPorTipo: Record<RatingType, number>;
        percentuaisPorTipo: Record<RatingType, number>;
        votesByService: any;
        recentVotes: Vote[];
        votesByDay: any[];
    }>;
}
