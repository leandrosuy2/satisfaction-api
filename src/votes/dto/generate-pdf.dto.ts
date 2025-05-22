// src/votes/dto/generate-pdf.dto.ts
export class GeneratePdfDto {
    startDate?: string;
    endDate?: string;
    charts: {
        satisfactionChart: string; // imagem em base64
    };
}