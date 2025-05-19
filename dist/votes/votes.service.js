"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vote_entity_1 = require("./entities/vote.entity");
const votes_gateway_1 = require("./votes.gateway");
const rating_type_enum_1 = require("./enums/rating-type.enum");
const service_type_entity_1 = require("../service-types/entities/service-type.entity");
const service_types_service_1 = require("../service-types/service-types.service");
const company_entity_1 = require("../companies/entities/company.entity");
const typeorm_3 = require("typeorm");
let VotesService = class VotesService {
    constructor(voteRepository, serviceTypeRepository, serviceTypesService, votesGateway, companyRepository) {
        this.voteRepository = voteRepository;
        this.serviceTypeRepository = serviceTypeRepository;
        this.serviceTypesService = serviceTypesService;
        this.votesGateway = votesGateway;
        this.companyRepository = companyRepository;
    }
    async create(createVoteDto) {
        const vote = this.voteRepository.create({
            ...createVoteDto,
            momento_voto: createVoteDto.momento_voto
                ? new Date(createVoteDto.momento_voto)
                : new Date(),
        });
        const savedVote = await this.voteRepository.save(vote);
        const analytics = await this.getAnalytics(createVoteDto.id_empresa);
        await this.votesGateway.broadcastVoteUpdate(createVoteDto.id_empresa, analytics);
        return savedVote;
    }
    async findAll() {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        return this.voteRepository.createQueryBuilder('vote')
            .where('vote.momento_voto >= :startOfDay', { startOfDay })
            .andWhere('vote.status = true')
            .orderBy('vote.momento_voto', 'DESC')
            .getMany();
    }
    async findOne(id_voto) {
        const vote = await this.voteRepository.findOne({
            where: { id_voto }
        });
        if (!vote) {
            throw new common_1.NotFoundException(`Vote with ID ${id_voto} not found`);
        }
        return vote;
    }
    async findByEmpresa(id_empresa) {
        return this.voteRepository.find({
            where: { id_empresa, status: true }
        });
    }
    async findByTipoServico(id_tipo_servico) {
        return this.voteRepository.find({
            where: { id_tipo_servico, status: true }
        });
    }
    async remove(id_voto) {
        const vote = await this.findOne(id_voto);
        vote.status = false;
        const updatedVote = await this.voteRepository.save(vote);
        const analytics = await this.getAnalytics(vote.id_empresa);
        await this.votesGateway.broadcastVoteUpdate(vote.id_empresa, analytics);
        return updatedVote;
    }
    async getAnalytics(companyId, startDate, endDate) {
        const where = {
            id_empresa: companyId,
            status: true,
        };
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1);
            where.momento_voto = (0, typeorm_2.Between)(start, end);
        }
        else {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            where.momento_voto = (0, typeorm_2.Between)(startOfDay, endOfDay);
        }
        const votes = await this.voteRepository.find({ where });
        const votosNegativos = await this.voteRepository.find({
            where: {
                id_empresa: companyId,
                avaliacao: (0, typeorm_3.In)(['Regular', 'Ruim']),
                status: true,
                ...(startDate && endDate
                    ? (() => {
                        const start = new Date(startDate);
                        const end = new Date(endDate);
                        end.setDate(end.getDate() + 1);
                        return { momento_voto: (0, typeorm_2.Between)(start, end) };
                    })()
                    : (() => {
                        const startOfDay = new Date();
                        startOfDay.setHours(0, 0, 0, 0);
                        const endOfDay = new Date();
                        endOfDay.setHours(23, 59, 59, 999);
                        return { momento_voto: (0, typeorm_2.Between)(startOfDay, endOfDay) };
                    })())
            },
            relations: ['tipo_servico'],
            order: { momento_voto: 'DESC' }
        });
        const totalVotes = votes.length;
        const avaliacoesPorTipo = Object.values(rating_type_enum_1.RatingType).reduce((acc, tipo) => {
            acc[tipo] = votes.filter(vote => vote.avaliacao === tipo).length;
            return acc;
        }, {});
        const percentuaisPorTipo = Object.entries(avaliacoesPorTipo).reduce((acc, [tipo, quantidade]) => {
            acc[tipo] = totalVotes > 0 ? (quantidade / totalVotes) * 100 : 0;
            return acc;
        }, {});
        const company = await this.companyRepository.findOne({
            where: { id: companyId },
            relations: ['servicos']
        });
        const serviceMap = new Map(company.servicos.map(service => [service.id, service]));
        const votesByService = await Promise.all(Object.entries(votes.reduce((acc, vote) => {
            const serviceName = vote.id_tipo_servico || 'Sem serviço';
            if (!acc[serviceName]) {
                acc[serviceName] = {
                    total: 0,
                    avaliacoes: Object.values(rating_type_enum_1.RatingType).reduce((a, tipo) => {
                        a[tipo] = 0;
                        return a;
                    }, {}),
                    percentuais: Object.values(rating_type_enum_1.RatingType).reduce((a, tipo) => {
                        a[tipo] = 0;
                        return a;
                    }, {}),
                    votes: [],
                    serviceInfo: null,
                };
            }
            acc[serviceName].total++;
            acc[serviceName].avaliacoes[vote.avaliacao]++;
            Object.entries(acc[serviceName].avaliacoes).forEach(([tipo, quantidade]) => {
                acc[serviceName].percentuais[tipo] = (quantidade / acc[serviceName].total) * 100;
            });
            acc[serviceName].votes.push(vote);
            return acc;
        }, {})).map(async ([serviceId, data]) => {
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
        }));
        const recentVotes = votes
            .sort((a, b) => b.momento_voto.getTime() - a.momento_voto.getTime())
            .slice(0, 5);
        const votesByDay = votes.reduce((acc, vote) => {
            const data = vote.momento_voto.toISOString().split('T')[0];
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
            acc[data][vote.avaliacao]++;
            acc[data].total++;
            return acc;
        }, {});
        return {
            totalVotes,
            avaliacoesPorTipo,
            percentuaisPorTipo,
            votesByService: Object.fromEntries(votesByService),
            recentVotes,
            votesByDay: Object.values(votesByDay),
            votosNegativos,
        };
    }
};
exports.VotesService = VotesService;
exports.VotesService = VotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vote_entity_1.Vote)),
    __param(1, (0, typeorm_1.InjectRepository)(service_type_entity_1.ServiceType)),
    __param(4, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        service_types_service_1.ServiceTypesService,
        votes_gateway_1.VotesGateway,
        typeorm_2.Repository])
], VotesService);
//# sourceMappingURL=votes.service.js.map