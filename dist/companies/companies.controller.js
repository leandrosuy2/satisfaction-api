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
exports.CompaniesController = void 0;
const common_1 = require("@nestjs/common");
const companies_service_1 = require("./companies.service");
const create_company_dto_1 = require("./dto/create-company.dto");
const create_company_service_dto_1 = require("./dto/create-company-service.dto");
const update_company_dto_1 = require("./dto/update-company.dto");
const update_company_service_dto_1 = require("./dto/update-company-service.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const line_type_enum_1 = require("./enums/line-type.enum");
let CompaniesController = class CompaniesController {
    constructor(companiesService) {
        this.companiesService = companiesService;
    }
    create(createCompanyDto) {
        return this.companiesService.create(createCompanyDto);
    }
    addService(id, createServiceDto) {
        return this.companiesService.addService(id, createServiceDto);
    }
    findAll() {
        return this.companiesService.findAll();
    }
    getLineTypes() {
        return Object.entries(line_type_enum_1.LineType)
            .filter(([key]) => isNaN(Number(key)))
            .map(([key, value]) => ({
            value: value,
            label: key
        }));
    }
    findOne(id) {
        return this.companiesService.findOne(id);
    }
    findServices(id) {
        return this.companiesService.findServices(id);
    }
    update(id, updateCompanyDto) {
        return this.companiesService.update(id, updateCompanyDto);
    }
    updateService(id, serviceId, updateServiceDto) {
        return this.companiesService.updateService(id, serviceId, updateServiceDto);
    }
    remove(id) {
        return this.companiesService.remove(id);
    }
    removeService(id, serviceId) {
        return this.companiesService.removeService(id, serviceId);
    }
    addUser(id, userId) {
        return this.companiesService.addUser(id, userId);
    }
    removeUser(id, userId) {
        return this.companiesService.removeUser(id, userId);
    }
};
exports.CompaniesController = CompaniesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new company' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Company successfully created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/services'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_company_service_dto_1.CreateCompanyServiceDto]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "addService", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all companies' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all companies' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('lines'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available line types' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Return available line types',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    value: { type: 'number' },
                    label: { type: 'string' }
                }
            }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "getLineTypes", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get company by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return company by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/services'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "findServices", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update company' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Company successfully updated' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_company_dto_1.UpdateCompanyDto]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/services/:serviceId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('serviceId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_company_service_dto_1.UpdateCompanyServiceDto]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "updateService", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete company' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Company successfully deleted' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id/services/:serviceId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('serviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "removeService", null);
__decorate([
    (0, common_1.Post)(':id/users/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Add user to company' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User successfully added to company' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "addUser", null);
__decorate([
    (0, common_1.Delete)(':id/users/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove user from company' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User successfully removed from company' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "removeUser", null);
exports.CompaniesController = CompaniesController = __decorate([
    (0, swagger_1.ApiTags)('companies'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('companies'),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService])
], CompaniesController);
//# sourceMappingURL=companies.controller.js.map