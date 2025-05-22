import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VotesGateway } from './votes.gateway';
import { RatingType } from './enums/rating-type.enum';
import { ServiceType } from '../service-types/entities/service-type.entity';
import { ServiceTypesService } from '../service-types/service-types.service';
import { Company } from '../companies/entities/company.entity';
import { In } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { AccessProfile } from '../users/enums/access-profile.enum';

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
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  // async create(createVoteDto: CreateVoteDto) {
  //   const vote = this.voteRepository.create(createVoteDto);
  //   const savedVote = await this.voteRepository.save(vote);

  //   // Send WebSocket update
  //   const analytics = await this.getAnalytics(createVoteDto.id_empresa);
  //   await this.votesGateway.broadcastVoteUpdate(createVoteDto.id_empresa, analytics);

  //   return savedVote;
  // }
  async create(createVoteDto: CreateVoteDto) {
    const vote = this.voteRepository.create({
      ...createVoteDto,
      momento_voto: createVoteDto.momento_voto
        ? new Date(createVoteDto.momento_voto)
        : new Date(), // fallback caso o app não envie
    });

    const savedVote = await this.voteRepository.save(vote);

    // Envia atualização via WebSocket
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

  async getAnalytics(companyId: string, startDate?: string, endDate?: string) {
    const where: any = {
      id_empresa: companyId,
      status: true,
    };

    // if (startDate && endDate) {
    //   const start = new Date(startDate);
    //   const end = new Date(endDate);S
    //   end.setDate(end.getDate() + 1); // ✅ Garante que o dia final seja incluso

    //   where.momento_voto = Between(start, end);
    // }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1); // ✅ Garante que o dia final seja incluso
      where.momento_voto = Between(start, end);
    } else {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      where.momento_voto = Between(startOfDay, endOfDay);
    }

    const votes = await this.voteRepository.find({ where });

    // 👇 Adicione isso aqui
    const votosNegativos = await this.voteRepository.find({
      where: {
        id_empresa: companyId,
        avaliacao: In(['Regular', 'Ruim']),
        status: true,
        // ...(startDate && endDate ? (() => {
        //   const start = new Date(startDate);
        //   const end = new Date(endDate);
        //   end.setDate(end.getDate() + 1);
        //   return { momento_voto: Between(start, end) };
        // })() : {})
        ...(startDate && endDate
          ? (() => {
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1);
            return { momento_voto: Between(start, end) };
          })()
          : (() => {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            return { momento_voto: Between(startOfDay, endOfDay) };
          })())
      },
      relations: ['tipo_servico'], // <- isso já resolve para incluir o serviço no voto
      order: { momento_voto: 'DESC' }
    });
    const totalVotes = votes.length;

    const avaliacoesPorTipo = Object.values(RatingType).reduce((acc, tipo) => {
      acc[tipo] = votes.filter(vote => vote.avaliacao === tipo).length;
      return acc;
    }, {} as Record<RatingType, number>);

    const percentuaisPorTipo = Object.entries(avaliacoesPorTipo).reduce((acc, [tipo, quantidade]) => {
      acc[tipo] = totalVotes > 0 ? (quantidade / totalVotes) * 100 : 0;
      return acc;
    }, {} as Record<RatingType, number>);

    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['servicos']
    });

    const serviceMap = new Map(company.servicos.map(service => [service.id, service]));

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
              hora_final: serviceInfo.hora_final,
              qtd_ref: serviceInfo.qtd_ref,
            };
          }
        }
        return [serviceId, data];
      })
    );

    const recentVotes = votes
      .sort((a, b) => b.momento_voto.getTime() - a.momento_voto.getTime())
      .slice(0, 5);

    // Agrupamento por dia (opcional, se quiser incluir no frontend)
    const votesByDay = votes.reduce((acc, vote) => {
      const data = vote.momento_voto.toISOString().split('T')[0]; // yyyy-mm-dd
      if (!acc[data]) {
        acc[data] = {
          data,
          Ótimo: 0,
          Bom: 0,
          Regular: 0,
          Ruim: 0,
          total: 0
        };
      }
      acc[data][vote.avaliacao]++; // Aqui usamos exatamente 'Ótimo', 'Bom', etc.
      acc[data].total++;
      return acc;
    }, {} as Record<string, any>);

    return {
      totalVotes,
      avaliacoesPorTipo,
      percentuaisPorTipo,
      votesByService: Object.fromEntries(votesByService),
      recentVotes,
      votesByDay: Object.values(votesByDay),
      votosNegativos, // 👈 adicione isso no retorno
    };
  }

  async findAllByUserAccess(userId: string) {
    // Primeiro busca o usuário sem carregar as empresas
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.perfil_acesso'])
      .where('user.id = :userId AND user.status = true', { userId })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Se não for admin/TI, busca as empresas do usuário
    let companyIds: string[] = [];
    if (user.perfil_acesso !== AccessProfile.ADMINISTRADOR && user.perfil_acesso !== AccessProfile.TI) {
      const userWithCompanies = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.id', 'empresas.id'])
        .leftJoin('user.empresas', 'empresas')
        .where('user.id = :userId', { userId })
        .getOne();

      if (userWithCompanies?.empresas) {
        companyIds = userWithCompanies.empresas.map(e => e.id);
      }
    }

    // Monta a query base
    const queryBuilder = this.voteRepository
      .createQueryBuilder('vote')
      .select([
        'vote.id_voto',
        'vote.id_empresa',
        'vote.id_tipo_servico',
        'vote.avaliacao',
        'vote.momento_voto',
        'vote.status',
        'vote.comentario',
        'vote.linha'
      ])
      .where('vote.status = true')
      .orderBy('vote.momento_voto', 'DESC')
      .take(50); // Reduzindo para 50 registros

    // Aplica os filtros baseado no perfil
    if (user.perfil_acesso === AccessProfile.ADMINISTRADOR || user.perfil_acesso === AccessProfile.TI) {
      return queryBuilder.getMany();
    }

    if (user.perfil_acesso === AccessProfile.DIRETOR || user.perfil_acesso === AccessProfile.GERENTE) {
      if (companyIds.length === 0) return [];
      return queryBuilder
        .andWhere('vote.id_empresa IN (:...companyIds)', { companyIds })
        .getMany();
    }

    if (companyIds.length > 0) {
      return queryBuilder
        .andWhere('vote.id_empresa = :companyId', { companyId: companyIds[0] })
        .getMany();
    }

    return [];
  }
} 