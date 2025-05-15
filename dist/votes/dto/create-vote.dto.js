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
exports.CreateVoteDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const rating_type_enum_1 = require("../enums/rating-type.enum");
class CreateVoteDto {
}
exports.CreateVoteDto = CreateVoteDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da empresa' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVoteDto.prototype, "id_empresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do tipo de serviço', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVoteDto.prototype, "id_tipo_servico", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Avaliação do serviço',
        enum: rating_type_enum_1.RatingType,
        example: rating_type_enum_1.RatingType.OTIMO
    }),
    (0, class_validator_1.IsEnum)(rating_type_enum_1.RatingType),
    __metadata("design:type", String)
], CreateVoteDto.prototype, "avaliacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Comentário opcional sobre o voto',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVoteDto.prototype, "comentario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Linha consumida pelo usuário',
        required: false,
        maxLength: 20
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateVoteDto.prototype, "linha", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Momento exato em que o voto foi feito',
        required: false,
        example: '2025-05-14 08:00:00'
    }),
    __metadata("design:type", String)
], CreateVoteDto.prototype, "momento_voto", void 0);
//# sourceMappingURL=create-vote.dto.js.map