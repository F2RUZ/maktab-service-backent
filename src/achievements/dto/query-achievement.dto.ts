import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class QueryAchievementDto {
  @ApiProperty({ 
    example: 'olympiad', 
    description: 'Kategoriya bo\'yicha filtrlash', 
    required: false 
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ 
    example: '2024', 
    description: 'Yil bo\'yicha filtrlash', 
    required: false 
  })
  @IsNumberString()
  @IsOptional()
  year?: string;
}