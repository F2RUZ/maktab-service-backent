import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsNumberString } from 'class-validator';

export class QueryNewsDto {
  @ApiProperty({ example: 1, description: 'Sahifa raqami', required: false, default: 1 })
  @IsNumberString()
  @IsOptional()
  page?: string;

  @ApiProperty({ example: 10, description: 'Har bir sahifada nechta yangilik', required: false, default: 10 })
  @IsNumberString()
  @IsOptional()
  limit?: string;

  @ApiProperty({ example: 'event', enum: ['event', 'achievement', 'announcement', 'general'], description: 'Kategoriya bo\'yicha filtrlash', required: false })
  @IsEnum(['event', 'achievement', 'announcement', 'general'])
  @IsOptional()
  category?: string;

  @ApiProperty({ example: 'true', description: 'Faqat nashr qilinganlarni ko\'rsatish', required: false })
  @IsString()
  @IsOptional()
  published?: string;

  @ApiProperty({ example: 'laboratoriya', description: 'Qidiruv (sarlavha va matnda)', required: false })
  @IsString()
  @IsOptional()
  search?: string;
}