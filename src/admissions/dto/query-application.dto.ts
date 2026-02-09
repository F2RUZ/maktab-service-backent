import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsNumberString } from 'class-validator';

export class QueryApplicationDto {
  @ApiProperty({ 
    example: 'PENDING', 
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'CONTACTED'], 
    description: 'Holat bo\'yicha filtrlash', 
    required: false 
  })
  @IsEnum(['PENDING', 'APPROVED', 'REJECTED', 'CONTACTED'])
  @IsOptional()
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CONTACTED';

  @ApiProperty({ example: 1, description: 'Sahifa raqami', required: false, default: 1 })
  @IsNumberString()
  @IsOptional()
  page?: string;

  @ApiProperty({ example: 20, description: 'Har bir sahifada nechta ariza', required: false, default: 20 })
  @IsNumberString()
  @IsOptional()
  limit?: string;
}