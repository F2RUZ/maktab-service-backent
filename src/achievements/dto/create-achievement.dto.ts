import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateAchievementDto {
  @ApiProperty({ example: 'Respublika olimpiadasida 1-o\'rin', description: 'Yutuq sarlavhasi (O\'zbek)' })
  @IsString()
  @IsNotEmpty({ message: 'O\'zbek tilidagi sarlavha kiritilishi shart' })
  title_uz: string;

  @ApiProperty({ example: '1-место на республиканской олимпиаде', description: 'Yutuq sarlavhasi (Rus)' })
  @IsString()
  @IsNotEmpty({ message: 'Rus tilidagi sarlavha kiritilishi shart' })
  title_ru: string;

  @ApiProperty({ example: '1st place at the Republic Olympiad', description: 'Yutuq sarlavhasi (Ingliz)' })
  @IsString()
  @IsNotEmpty({ message: 'Ingliz tilidagi sarlavha kiritilishi shart' })
  title_en: string;

  @ApiProperty({ 
    example: 'Matematika fanidan respublika olimpiadasida ishtirok etib...', 
    description: 'Yutuq tavsifi (O\'zbek)' 
  })
  @IsString()
  @IsNotEmpty({ message: 'O\'zbek tilidagi tavsif kiritilishi shart' })
  description_uz: string;

  @ApiProperty({ 
    example: 'Принял участие в республиканской олимпиаде по математике...', 
    description: 'Yutuq tavsifi (Rus)' 
  })
  @IsString()
  @IsNotEmpty({ message: 'Rus tilidagi tavsif kiritilishi shart' })
  description_ru: string;

  @ApiProperty({ 
    example: 'Participated in the Republic Mathematics Olympiad...', 
    description: 'Yutuq tavsifi (Ingliz)' 
  })
  @IsString()
  @IsNotEmpty({ message: 'Ingliz tilidagi tavsif kiritilishi shart' })
  description_en: string;

  @ApiProperty({ 
    example: 'olympiad', 
    enum: ['olympiad', 'sports', 'arts', 'science'], 
    description: 'Yutuq kategoriyasi' 
  })
  @IsString()
  @IsNotEmpty({ message: 'Kategoriya kiritilishi shart' })
  category: string;

  @ApiProperty({ example: 2024, description: 'Yil', minimum: 1900, maximum: 2100 })
  @IsNumber()
  @Min(1900, { message: 'Yil 1900 dan katta bo\'lishi kerak' })
  @Max(2100, { message: 'Yil 2100 dan kichik bo\'lishi kerak' })
  @IsNotEmpty({ message: 'Yil kiritilishi shart' })
  year: number;

  @ApiProperty({ 
    example: 'https://example.com/certificate.jpg', 
    description: 'Diplom yoki sertifikat rasmi', 
    required: false 
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 'Aziz Rahimov', description: 'O\'quvchi ismi', required: false })
  @IsString()
  @IsOptional()
  studentName?: string;

  @ApiProperty({ example: '10-A', description: 'O\'quvchi sinfi', required: false })
  @IsString()
  @IsOptional()
  studentClass?: string;

  @ApiProperty({ example: 0, description: 'Tartib raqami', required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;
}