import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCompanyServiceDto } from './dto/create-company-service.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdateCompanyServiceDto } from './dto/update-company-service.dto';
import { LineType } from './enums/line-type.enum';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    create(createCompanyDto: CreateCompanyDto): Promise<import("./entities/company.entity").Company>;
    addService(id: string, createServiceDto: CreateCompanyServiceDto): Promise<import("./entities/company-service.entity").CompanyService>;
    findAll(): Promise<import("./entities/company.entity").Company[]>;
    getLineTypes(): {
        value: string | LineType;
        label: string;
    }[];
    findOne(id: string): Promise<import("./entities/company.entity").Company>;
    findServices(id: string): Promise<import("./entities/company-service.entity").CompanyService[]>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<import("./entities/company.entity").Company>;
    updateService(id: string, serviceId: string, updateServiceDto: UpdateCompanyServiceDto): Promise<import("./entities/company-service.entity").CompanyService>;
    remove(id: string): Promise<import("./entities/company.entity").Company>;
    removeService(id: string, serviceId: string): Promise<import("./entities/company-service.entity").CompanyService>;
    addUser(id: string, userId: string): Promise<import("./entities/company.entity").Company>;
    removeUser(id: string, userId: string): Promise<import("./entities/company.entity").Company>;
}
