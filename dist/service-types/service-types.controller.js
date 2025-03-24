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
exports.ServiceTypesController = void 0;
const common_1 = require("@nestjs/common");
const service_types_service_1 = require("./service-types.service");
const create_service_type_dto_1 = require("./dto/create-service-type.dto");
const update_service_type_dto_1 = require("./dto/update-service-type.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ServiceTypesController = class ServiceTypesController {
    constructor(serviceTypesService) {
        this.serviceTypesService = serviceTypesService;
    }
    create(createServiceTypeDto) {
        return this.serviceTypesService.create(createServiceTypeDto);
    }
    findAll() {
        return this.serviceTypesService.findAll();
    }
    findOne(id) {
        return this.serviceTypesService.findOne(id);
    }
    update(id, updateServiceTypeDto) {
        return this.serviceTypesService.update(id, updateServiceTypeDto);
    }
    remove(id) {
        return this.serviceTypesService.remove(id);
    }
};
exports.ServiceTypesController = ServiceTypesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_type_dto_1.CreateServiceTypeDto]),
    __metadata("design:returntype", void 0)
], ServiceTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServiceTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_service_type_dto_1.UpdateServiceTypeDto]),
    __metadata("design:returntype", void 0)
], ServiceTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceTypesController.prototype, "remove", null);
exports.ServiceTypesController = ServiceTypesController = __decorate([
    (0, swagger_1.ApiTags)('service-types'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('service-types'),
    __metadata("design:paramtypes", [service_types_service_1.ServiceTypesService])
], ServiceTypesController);
//# sourceMappingURL=service-types.controller.js.map