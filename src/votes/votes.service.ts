import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VotesGateway } from './votes.gateway';
import { RatingType } from './enums/rating-type.enum';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,
    private votesGateway: VotesGateway,
  ) {}

  async create(createVoteDto: CreateVoteDto) {
    const vote = this.voteRepository.create(createVoteDto);
    const savedVote = await this.voteRepository.save(vote);
    
    // Send WebSocket update
    const analytics = await this.getAnalytics(createVoteDto.id_empresa);
    await this.votesGateway.broadcastVoteUpdate(createVoteDto.id_empresa, analytics);
    
    return savedVote;
  }

  findAll() {
    return this.voteRepository.find();
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

    // Análise por tipo de serviço
    const votesByService = votes.reduce((acc, vote) => {
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
    }>);

    // Votos recentes
    const recentVotes = votes
      .sort((a, b) => b.momento_voto.getTime() - a.momento_voto.getTime())
      .slice(0, 5);

    return {
      totalVotes,
      avaliacoesPorTipo,
      percentuaisPorTipo,
      votesByService,
      recentVotes,
    };
  }
} 