import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VotesGateway } from './votes.gateway';
import { RatingType } from './enums/rating-type.enum';
import { ServiceType } from '../service-types/entities/service-type.entity';
import { ServiceTypesService } from '../service-types/service-types.service';
import { Company } from '../companies/entities/company.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
    @InjectRepository(ServiceType)
    private serviceTypeRepository: Repository<ServiceType>,
    private serviceTypesService: ServiceTypesService,
    private votesGateway: VotesGateway,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) { }

  async create(createVoteDto: CreateVoteDto) {
    const vote = this.voteRepository.create(createVoteDto);
    const savedVote = await this.voteRepository.save(vote);

    // Send WebSocket update
    const analytics = await this.getAnalytics(createVoteDto.id_empresa);
    await this.votesGateway.broadcastVoteUpdate(createVoteDto.id_empresa, analytics);

    return savedVote;
  }

  // findAll() {
  //   return this.voteRepository.find();
  // }

  async findAll() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    return this.voteRepository.createQueryBuilder('vote')
      .where('vote.momento_voto >= :startOfDay', { startOfDay })
      .andWhere('vote.status = true') // opcional, se quiser filtrar apenas os ativos
      .orderBy('vote.momento_voto', 'DESC')
      .getMany();
  }

  async findOne(id_voto: string) {
    const vote = await this.voteRepository.findOne({
      where: { id_voto }
    });

    if (!vote) {
      throw new NotFoundException(`Vote with ID ${id_voto} not found`);
    }

    return vote;
  }

  async findByEmpresa(id_empresa: string) {
    return this.voteRepository.find({
      where: { id_empresa, status: true }
    });
  }

  async findByTipoServico(id_tipo_servico: string) {
    return this.voteRepository.find({
      where: { id_tipo_servico, status: true }
    });
  }

  async remove(id_voto: string) {
    const vote = await this.findOne(id_voto);
    vote.status = false;
    const updatedVote = await this.voteRepository.save(vote);

    // Send WebSocket update
    const analytics = await this.getAnalytics(vote.id_empresa);
    await this.votesGateway.broadcastVoteUpdate(vote.id_empresa, analytics);

    return updatedVote;
  }

  async getAnalytics(companyId: string) {
    const votes = await this.voteRepository.find({
      where: { id_empresa: companyId, status: true }
    });

    const totalVotes = votes.length;

    // Contagem por tipo de avaliação
    const avaliacoesPorTipo = Object.values(RatingType).reduce((acc, tipo) => {
      acc[tipo] = votes.filter(vote => vote.avaliacao === tipo).length;
      return acc;
    }, {} as Record<RatingType, number>);

    // Percentual por tipo de avaliação
    const percentuaisPorTipo = Object.entries(avaliacoesPorTipo).reduce((acc, [tipo, quantidade]) => {
      acc[tipo] = totalVotes > 0 ? (quantidade / totalVotes) * 100 : 0;
      return acc;
    }, {} as Record<RatingType, number>);

    // Buscar a empresa com seus serviços
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['servicos']
    });

    const serviceMap = new Map(company.servicos.map(service => [service.id, service]));

    // Análise por tipo de serviço
    const votesByService = await Promise.all(
      Object.entries(
        votes.reduce((acc, vote) => {
          const serviceName = vote.id_tipo_servico || 'Sem serviço';
          if (!acc[serviceName]) {
            acc[serviceName] = {
              total: 0,
              avaliacoes: Object.values(RatingType).reduce((a, tipo) => {
                a[tipo] = 0;
                return a;
              }, {} as Record<RatingType, number>),
              percentuais: Object.values(RatingType).reduce((a, tipo) => {
                a[tipo] = 0;
                return a;
              }, {} as Record<RatingType, number>),
              votes: [],
              serviceInfo: null,
            };
          }

          acc[serviceName].total++;
          acc[serviceName].avaliacoes[vote.avaliacao]++;

          // Calcular percentuais para este serviço
          Object.entries(acc[serviceName].avaliacoes).forEach(([tipo, quantidade]: [RatingType, number]) => {
            acc[serviceName].percentuais[tipo] = (quantidade / acc[serviceName].total) * 100;
          });

          acc[serviceName].votes.push(vote);
          return acc;
        }, {} as Record<string, {
          total: number;
          avaliacoes: Record<RatingType, number>;
          percentuais: Record<RatingType, number>;
          votes: Vote[];
          serviceInfo: any;
        }>)
      ).map(async ([serviceId, data]) => {
        if (serviceId !== 'Sem serviço') {
          const serviceInfo = serviceMap.get(serviceId);
          if (serviceInfo) {
            data.serviceInfo = {
              nome: serviceInfo.nome,
              tipo_servico: serviceInfo.tipo_servico,
              hora_inicio: serviceInfo.hora_inicio,
              hora_final: serviceInfo.hora_final
            };
          } else {
            console.log(`Serviço não encontrado para ID: ${serviceId}`);
          }
        }
        return [serviceId, data];
      })
    );

    // Votos recentes
    const recentVotes = votes
      .sort((a, b) => b.momento_voto.getTime() - a.momento_voto.getTime())
      .slice(0, 5);

    return {
      totalVotes,
      avaliacoesPorTipo,
      percentuaisPorTipo,
      votesByService: Object.fromEntries(votesByService),
      recentVotes,
    };
  }
} 