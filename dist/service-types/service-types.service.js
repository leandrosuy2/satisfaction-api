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
exports.ServiceTypesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const service_type_entity_1 = require("./entities/service-type.entity");
let ServiceTypesService = class ServiceTypesService {
    constructor(serviceTypeRepository) {
        this.serviceTypeRepository = serviceTypeRepository;
    }
    create(createServiceTypeDto) {
        const serviceType = this.serviceTypeRepository.create(createServiceTypeDto);
        return this.serviceTypeRepository.save(serviceType);
    }
    findAll() {
        return this.serviceTypeRepository.find({
            where: { status: true },
        });
    }
    async findOne(id) {
        const serviceType = await this.serviceTypeRepository.findOne({
            where: { id, status: true },
        });
        if (!serviceType) {
            throw new common_1.NotFoundException(`Service type with ID ${id} not found`);
        }
        return serviceType;
    }
    async update(id, updateServiceTypeDto) {
        const serviceType = await this.findOne(id);
        this.serviceTypeRepository.merge(serviceType, updateServiceTypeDto);
        return this.serviceTypeRepository.save(serviceType);
    }
    async remove(id) {
        const serviceType = await this.findOne(id);
        serviceType.status = false;
        return this.serviceTypeRepository.save(serviceType);
    }
};
exports.ServiceTypesService = ServiceTypesService;
exports.ServiceTypesService = ServiceTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_type_entity_1.ServiceType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServiceTypesService);
//# sourceMappingURL=service-types.service.js.map