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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const question_entity_1 = require("./entities/question.entity");
const question_response_entity_1 = require("./entities/question-response.entity");
let QuestionsService = class QuestionsService {
    constructor(questionRepository, responseRepository) {
        this.questionRepository = questionRepository;
        this.responseRepository = responseRepository;
    }
    create(createQuestionDto) {
        const question = this.questionRepository.create(createQuestionDto);
        return this.questionRepository.save(question);
    }
    async addResponse(id, createResponseDto) {
        const question = await this.findOne(id);
        const response = this.responseRepository.create({
            ...createResponseDto,
            id_pergunta: question.id,
        });
        return this.responseRepository.save(response);
    }
    findAll() {
        return this.questionRepository.find({
            where: { status: true },
            relations: ['respostas'],
        });
    }
    async findOne(id) {
        const question = await this.questionRepository.findOne({
            where: { id, status: true },
            relations: ['respostas'],
        });
        if (!question) {
            throw new common_1.NotFoundException(`Question with ID ${id} not found`);
        }
        return question;
    }
    findResponses(id) {
        return this.responseRepository.find({
            where: { id_pergunta: id, status: true },
            order: { ordem: 'ASC' },
        });
    }
    async remove(id) {
        const question = await this.findOne(id);
        question.status = false;
        return this.questionRepository.save(question);
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(1, (0, typeorm_1.InjectRepository)(question_response_entity_1.QuestionResponse)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map