import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryTeacherDto {
  @ApiProperty({ 
    example: 'mathematics', 
    description: 'Fan bo\'yicha filtrlash', 
    required: false 
  })
  @IsString()
  @IsOptional()
  subject?: string;

  @ApiProperty({ 
    example: 'true', 
    description: 'Faqat faol o\'qituvchilar', 
    required: false 
  })
  @IsString()
  @IsOptional()
  isActive?: string;
}