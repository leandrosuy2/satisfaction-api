"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnairesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const questionnaires_service_1 = require("./questionnaires.service");
const questionnaires_controller_1 = require("./questionnaires.controller");
const questionnaire_entity_1 = require("./entities/questionnaire.entity");
const questionnaire_question_entity_1 = require("./entities/questionnaire-question.entity");
const questions_module_1 = require("../questions/questions.module");
let QuestionnairesModule = class QuestionnairesModule {
};
exports.QuestionnairesModule = QuestionnairesModule;
exports.QuestionnairesModule = QuestionnairesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([questionnaire_entity_1.Questionnaire, questionnaire_question_entity_1.QuestionnaireQuestion]),
            questions_module_1.QuestionsModule,
        ],
        controllers: [questionnaires_controller_1.QuestionnairesController],
        providers: [questionnaires_service_1.QuestionnairesService],
        exports: [questionnaires_service_1.QuestionnairesService],
    })
], QuestionnairesModule);
//# sourceMappingURL=questionnaires.module.js.map