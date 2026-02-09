import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber } from 'class-validator';

export class CreateGalleryDto {
  @ApiProperty({ 
    example: 'PHOTO', 
    enum: ['PHOTO', 'VIDEO', 'VIRTUAL_TOUR'], 
    description: 'Media turi' 
  })
  @IsEnum(['PHOTO', 'VIDEO', 'VIRTUAL_TOUR'])
  @IsNotEmpty({ message: 'Media turi kiritilishi shart' })
  type: 'PHOTO' | 'VIDEO' | 'VIRTUAL_TOUR';

  @ApiProperty({ example: 'Maktab binosi', description: 'Sarlavha (O\'zbek)' })
  @IsString()
  @IsNotEmpty({ message: 'O\'zbek tilidagi sarlavha kiritilishi shart' })
  title_uz: string;

  @ApiProperty({ example: 'Здание школы', description: 'Sarlavha (Rus)' })
  @IsString()
  @IsNotEmpty({ message: 'Rus tilidagi sarlavha kiritilishi shart' })
  title_ru: string;

  @ApiProperty({ example: 'School Building', description: 'Sarlavha (Ingliz)' })
  @IsString()
  @IsNotEmpty({ message: 'Ingliz tilidagi sarlavha kiritilishi shart' })
  title_en: string;

  @ApiProperty({ example: 'Yangi qurilgan zamonaviy bino', description: 'Tavsif (O\'zbek)', required: false })
  @IsString()
  @IsOptional()
  description_uz?: string;

  @ApiProperty({ example: 'Новое современное здание', description: 'Tavsif (Rus)', required: false })
  @IsString()
  @IsOptional()
  description_ru?: string;

  @ApiProperty({ example: 'Newly built modern building', description: 'Tavsif (Ingliz)', required: false })
  @IsString()
  @IsOptional()
  description_en?: string;

  @ApiProperty({ 
    example: 'https://example.com/photo.jpg', 
    description: 'Rasm/Video URL yoki file path' 
  })
  @IsString()
  @IsNotEmpty({ message: 'URL kiritilishi shart' })
  url: string;

  @ApiProperty({ 
    example: 'https://example.com/thumbnail.jpg', 
    description: 'Video uchun thumbnail rasm', 
    required: false 
  })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({ 
    example: 'events', 
    description: 'Kategoriya (events, sports, arts, classes, building, etc.)' 
  })
  @IsString()
  @IsNotEmpty({ message: 'Kategoriya kiritilishi shart' })
  category: string;

  @ApiProperty({ example: 0, description: 'Tartib raqami', required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;
}