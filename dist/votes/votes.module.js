"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const votes_controller_1 = require("./votes.controller");
const vote_entity_1 = require("./entities/vote.entity");
const votes_service_1 = require("./votes.service");
const votes_gateway_1 = require("./votes.gateway");
const service_type_entity_1 = require("../service-types/entities/service-type.entity");
const service_types_module_1 = require("../service-types/service-types.module");
const company_entity_1 = require("../companies/entities/company.entity");
const companies_module_1 = require("../companies/companies.module");
const user_entity_1 = require("../users/entities/user.entity");
const users_module_1 = require("../users/users.module");
let VotesModule = class VotesModule {
};
exports.VotesModule = VotesModule;
exports.VotesModule = VotesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([vote_entity_1.Vote, service_type_entity_1.ServiceType, company_entity_1.Company, user_entity_1.User]),
            service_types_module_1.ServiceTypesModule,
            companies_module_1.CompaniesModule,
            users_module_1.UsersModule
        ],
        controllers: [votes_controller_1.VotesController],
        providers: [votes_service_1.VotesService, votes_gateway_1.VotesGateway],
        exports: [votes_service_1.VotesService, votes_gateway_1.VotesGateway],
    })
], VotesModule);
//# sourceMappingURL=votes.module.js.map