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
let VotesService = class VotesService {
    constructor(voteRepository, votesGateway) {
        this.voteRepository = voteRepository;
        this.votesGateway = votesGateway;
    }
    async create(createVoteDto) {
        const vote = this.voteRepository.create(createVoteDto);
        const savedVote = await this.voteRepository.save(vote);
        const analytics = await this.getAnalytics(createVoteDto.id_empresa);
        await this.votesGateway.broadcastVoteUpdate(createVoteDto.id_empresa, analytics);
        return savedVote;
    }
    findAll() {
        return this.voteRepository.find();
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
    async getAnalytics(companyId) {
        const votes = await this.voteRepository.find({
            where: { id_empresa: companyId, status: true }
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
        const votesByService = votes.reduce((acc, vote) => {
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
                };
            }
            acc[serviceName].total++;
            acc[serviceName].avaliacoes[vote.avaliacao]++;
            Object.entries(acc[serviceName].avaliacoes).forEach(([tipo, quantidade]) => {
                acc[serviceName].percentuais[tipo] = (quantidade / acc[serviceName].total) * 100;
            });
            acc[serviceName].votes.push(vote);
            return acc;
        }, {});
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
};
exports.VotesService = VotesService;
exports.VotesService = VotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vote_entity_1.Vote)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        votes_gateway_1.VotesGateway])
], VotesService);
//# sourceMappingURL=votes.service.js.map