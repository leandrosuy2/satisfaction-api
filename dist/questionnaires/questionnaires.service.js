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
exports.QuestionnairesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const questionnaire_entity_1 = require("./entities/questionnaire.entity");
const questionnaire_question_entity_1 = require("./entities/questionnaire-question.entity");
const questions_service_1 = require("../questions/questions.service");
let QuestionnairesService = class QuestionnairesService {
    constructor(questionnaireRepository, questionnaireQuestionRepository, questionsService) {
        this.questionnaireRepository = questionnaireRepository;
        this.questionnaireQuestionRepository = questionnaireQuestionRepository;
        this.questionsService = questionsService;
    }
    create(createQuestionnaireDto) {
        const questionnaire = this.questionnaireRepository.create(createQuestionnaireDto);
        return this.questionnaireRepository.save(questionnaire);
    }
    async addQuestion(id, addQuestionDto) {
        const questionnaire = await this.findOne(id);
        const question = await this.questionsService.findOne(addQuestionDto.id_pergunta);
        const questionnaireQuestion = this.questionnaireQuestionRepository.create({
            ...addQuestionDto,
            id_questionario: questionnaire.id,
            nome_pergunta: question.nome,
        });
        return this.questionnaireQuestionRepository.save(questionnaireQuestion);
    }
    findAll() {
        return this.questionnaireRepository.find({
            where: { status: true },
            relations: ['perguntas', 'empresa'],
        });
    }
    async findOne(id) {
        const questionnaire = await this.questionnaireRepository.findOne({
            where: { id, status: true },
            relations: ['perguntas', 'empresa'],
        });
        if (!questionnaire) {
            throw new common_1.NotFoundException(`Questionnaire with ID ${id} not found`);
        }
        return questionnaire;
    }
    findByCompany(companyId) {
        return this.questionnaireRepository.find({
            where: { id_empresa: companyId, status: true },
            relations: ['perguntas'],
        });
    }
    async remove(id) {
        const questionnaire = await this.findOne(id);
        questionnaire.status = false;
        return this.questionnaireRepository.save(questionnaire);
    }
};
exports.QuestionnairesService = QuestionnairesService;
exports.QuestionnairesService = QuestionnairesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(questionnaire_entity_1.Questionnaire)),
    __param(1, (0, typeorm_1.InjectRepository)(questionnaire_question_entity_1.QuestionnaireQuestion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        questions_service_1.QuestionsService])
], QuestionnairesService);
//# sourceMappingURL=questionnaires.service.js.map