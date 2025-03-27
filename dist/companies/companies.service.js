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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("./entities/company.entity");
const company_service_entity_1 = require("./entities/company-service.entity");
let CompaniesService = class CompaniesService {
    constructor(companyRepository, companyServiceRepository) {
        this.companyRepository = companyRepository;
        this.companyServiceRepository = companyServiceRepository;
    }
    create(createCompanyDto) {
        const company = this.companyRepository.create(createCompanyDto);
        return this.companyRepository.save(company);
    }
    async addService(id, createServiceDto) {
        const company = await this.findOne(id);
        const service = this.companyServiceRepository.create({
            ...createServiceDto,
            id_empresa: company.id,
        });
        return this.companyServiceRepository.save(service);
    }
    findAll() {
        return this.companyRepository.find({
            relations: ['usuarios'],
            order: {
                created_at: 'DESC'
            }
        });
    }
    async findOne(id) {
        const company = await this.companyRepository.findOne({
            where: { id },
            relations: ['usuarios'],
        });
        if (!company) {
            throw new common_1.NotFoundException(`Company with ID ${id} not found`);
        }
        return company;
    }
    async update(id, updateCompanyDto) {
        const company = await this.findOne(id);
        Object.assign(company, updateCompanyDto);
        return this.companyRepository.save(company);
    }
    async updateService(id, serviceId, updateServiceDto) {
        const service = await this.companyServiceRepository.findOne({
            where: { id: serviceId, id_empresa: id },
        });
        if (!service) {
            throw new common_1.NotFoundException(`Service with ID ${serviceId} not found in company ${id}`);
        }
        Object.assign(service, updateServiceDto);
        return this.companyServiceRepository.save(service);
    }
    findServices(id) {
        return this.companyServiceRepository.find({
            where: { id_empresa: id, status: true },
        });
    }
    async remove(id) {
        const company = await this.findOne(id);
        company.status = false;
        return this.companyRepository.save(company);
    }
    async removeService(id, serviceId) {
        const service = await this.companyServiceRepository.findOne({
            where: { id: serviceId, id_empresa: id },
        });
        if (!service) {
            throw new common_1.NotFoundException(`Service with ID ${serviceId} not found in company ${id}`);
        }
        service.status = false;
        return this.companyServiceRepository.save(service);
    }
    async addUser(companyId, userId) {
        const company = await this.findOne(companyId);
        company.usuarios = [...(company.usuarios || []), { id: userId }];
        return this.companyRepository.save(company);
    }
    async removeUser(companyId, userId) {
        const company = await this.findOne(companyId);
        company.usuarios = company.usuarios.filter(user => user.id !== userId);
        return this.companyRepository.save(company);
    }
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __param(1, (0, typeorm_1.InjectRepository)(company_service_entity_1.CompanyService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map