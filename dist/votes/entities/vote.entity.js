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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const service_type_entity_1 = require("../../service-types/entities/service-type.entity");
const rating_type_enum_1 = require("../enums/rating-type.enum");
let Vote = class Vote {
};
exports.Vote = Vote;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ description: 'ID único do voto' }),
    __metadata("design:type", String)
], Vote.prototype, "id_voto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'ID da empresa' }),
    __metadata("design:type", String)
], Vote.prototype, "id_empresa", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ description: 'ID do tipo de serviço' }),
    __metadata("design:type", String)
], Vote.prototype, "id_tipo_servico", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_type_entity_1.ServiceType),
    (0, typeorm_1.JoinColumn)({ name: 'id_tipo_servico' }),
    __metadata("design:type", service_type_entity_1.ServiceType)
], Vote.prototype, "serviceType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: rating_type_enum_1.RatingType,
        default: rating_type_enum_1.RatingType.REGULAR
    }),
    (0, swagger_1.ApiProperty)({
        description: 'Avaliação do serviço',
        enum: rating_type_enum_1.RatingType,
        example: rating_type_enum_1.RatingType.OTIMO
    }),
    __metadata("design:type", String)
], Vote.prototype, "avaliacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ description: 'Comentário opcional sobre o voto' }),
    __metadata("design:type", String)
], Vote.prototype, "comentario", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, swagger_1.ApiProperty)({ description: 'Status do voto (ativo/inativo)' }),
    __metadata("design:type", Boolean)
], Vote.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({ description: 'Data de criação do voto' }),
    __metadata("design:type", Date)
], Vote.prototype, "momento_voto", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)({ description: 'Data da última atualização do voto' }),
    __metadata("design:type", Date)
], Vote.prototype, "updated_at", void 0);
exports.Vote = Vote = __decorate([
    (0, typeorm_1.Entity)('votes')
], Vote);
//# sourceMappingURL=vote.entity.js.map