import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCompanyServiceDto } from './dto/create-company-service.dto';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    create(createCompanyDto: CreateCompanyDto): Promise<import("./entities/company.entity").Company>;
    addService(id: string, createServiceDto: CreateCompanyServiceDto): Promise<import("./entities/company-service.entity").CompanyService>;
    findAll(): Promise<import("./entities/company.entity").Company[]>;
    findOne(id: string): Promise<import("./entities/company.entity").Company>;
    findServices(id: string): Promise<import("./entities/company-service.entity").CompanyService[]>;
    remove(id: string): Promise<import("./entities/company.entity").Company>;
}
