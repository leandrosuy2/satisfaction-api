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
exports.VotesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_vote_dto_1 = require("./dto/create-vote.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const votes_service_1 = require("./votes.service");
let VotesController = class VotesController {
    constructor(votesService) {
        this.votesService = votesService;
    }
    create(createVoteDto) {
        return this.votesService.create(createVoteDto);
    }
    findAll(req) {
        const userId = req.user['id'];
        return this.votesService.findAllByUserAccess(userId);
    }
    getAnalyticsRelatorio(companyId, startDate, endDate) {
        return this.votesService.getAnalytics(companyId, startDate, endDate);
    }
    getAnalytics(companyId) {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        return this.votesService.getAnalytics(companyId, start.toISOString(), end.toISOString());
    }
    findOne(id) {
        return this.votesService.findOne(id);
    }
    findByEmpresa(id_empresa) {
        return this.votesService.findByEmpresa(id_empresa);
    }
    findByTipoServico(id_tipo_servico) {
        return this.votesService.findByTipoServico(id_tipo_servico);
    }
    remove(id) {
        return this.votesService.remove(id);
    }
};
exports.VotesController = VotesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new vote' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Vote successfully created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vote_dto_1.CreateVoteDto]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all votes accessible to the user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all votes accessible to the user' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('analytics_relatorio/:companyId'),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "getAnalyticsRelatorio", null);
__decorate([
    (0, common_1.Get)('analytics/:companyId'),
    __param(0, (0, common_1.Param)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get vote by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return vote by ID' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vote not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('empresa/:id_empresa'),
    (0, swagger_1.ApiOperation)({ summary: 'Get votes by company' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return votes by company' }),
    __param(0, (0, common_1.Param)('id_empresa')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "findByEmpresa", null);
__decorate([
    (0, common_1.Get)('servico/:id_tipo_servico'),
    (0, swagger_1.ApiOperation)({ summary: 'Get votes by service type' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return votes by service type' }),
    __param(0, (0, common_1.Param)('id_tipo_servico')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "findByTipoServico", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a vote' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Vote successfully deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vote not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "remove", null);
exports.VotesController = VotesController = __decorate([
    (0, swagger_1.ApiTags)('votes'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('votes'),
    __metadata("design:paramtypes", [votes_service_1.VotesService])
], VotesController);
//# sourceMappingURL=votes.controller.js.map