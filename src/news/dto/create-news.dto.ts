import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsEnum } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ example: 'Maktabda yangi laboratoriya ochildi', description: 'Yangilik sarlavhasi (O\'zbek)' })
  @IsString()
  @IsNotEmpty({ message: 'O\'zbek tilidagi sarlavha kiritilishi shart' })
  title_uz: string;

  @ApiProperty({ example: 'В школе открылась новая лаборатория', description: 'Yangilik sarlavhasi (Rus)' })
  @IsString()
  @IsNotEmpty({ message: 'Rus tilidagi sarlavha kiritilishi shart' })
  title_ru: string;

  @ApiProperty({ example: 'New laboratory opened at school', description: 'Yangilik sarlavhasi (Ingliz)' })
  @IsString()
  @IsNotEmpty({ message: 'Ingliz tilidagi sarlavha kiritilishi shart' })
  title_en: string;

  @ApiProperty({ example: 'Bugun maktabimizda zamonaviy...', description: 'Yangilik matni (O\'zbek)' })
  @IsString()
  @IsNotEmpty({ message: 'O\'zbek tilidagi matn kiritilishi shart' })
  content_uz: string;

  @ApiProperty({ example: 'Сегодня в нашей школе...', description: 'Yangilik matni (Rus)' })
  @IsString()
  @IsNotEmpty({ message: 'Rus tilidagi matn kiritilishi shart' })
  content_ru: string;

  @ApiProperty({ example: 'Today at our school...', description: 'Yangilik matni (Ingliz)' })
  @IsString()
  @IsNotEmpty({ message: 'Ingliz tilidagi matn kiritilishi shart' })
  content_en: string;

  @ApiProperty({ example: 'Qisqa tavsif...', description: 'Qisqa tavsif (O\'zbek)', required: false })
  @IsString()
  @IsOptional()
  excerpt_uz?: string;

  @ApiProperty({ example: 'Краткое описание...', description: 'Qisqa tavsif (Rus)', required: false })
  @IsString()
  @IsOptional()
  excerpt_ru?: string;

  @ApiProperty({ example: 'Short description...', description: 'Qisqa tavsif (Ingliz)', required: false })
  @IsString()
  @IsOptional()
  excerpt_en?: string;

  @ApiProperty({ example: 'event', enum: ['event', 'achievement', 'announcement', 'general'], description: 'Yangilik kategoriyasi' })
  @IsEnum(['event', 'achievement', 'announcement', 'general'])
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Yangilik rasmi URL', required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: true, description: 'Nashr qilinganmi?', default: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}