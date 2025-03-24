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
exports.QuestionnaireQuestion = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const questionnaire_entity_1 = require("./questionnaire.entity");
const question_entity_1 = require("../../questions/entities/question.entity");
let QuestionnaireQuestion = class QuestionnaireQuestion {
};
exports.QuestionnaireQuestion = QuestionnaireQuestion;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuestionnaireQuestion.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuestionnaireQuestion.prototype, "id_questionario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuestionnaireQuestion.prototype, "id_pergunta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuestionnaireQuestion.prototype, "nome_pergunta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], QuestionnaireQuestion.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], QuestionnaireQuestion.prototype, "ordem", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuestionnaireQuestion.prototype, "user_add", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuestionnaireQuestion.prototype, "date_add", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => questionnaire_entity_1.Questionnaire, questionnaire => questionnaire.perguntas),
    (0, typeorm_1.JoinColumn)({ name: 'id_questionario' }),
    __metadata("design:type", questionnaire_entity_1.Questionnaire)
], QuestionnaireQuestion.prototype, "questionnaire", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => question_entity_1.Question),
    (0, typeorm_1.JoinColumn)({ name: 'id_pergunta' }),
    __metadata("design:type", question_entity_1.Question)
], QuestionnaireQuestion.prototype, "pergunta", void 0);
exports.QuestionnaireQuestion = QuestionnaireQuestion = __decorate([
    (0, typeorm_1.Entity)('questionnaire_questions')
], QuestionnaireQuestion);
//# sourceMappingURL=questionnaire-question.entity.js.map