import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsNumber, IsBoolean, IsArray, IsObject } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({ example: 'Jasur Aliyev', description: 'O\'qituvchi ismi (O\'zbek)' })
  @IsString()
  @IsNotEmpty({ message: 'O\'zbek tilidagi ism kiritilishi shart' })
  name_uz: string;

  @ApiProperty({ example: 'Жасур Алиев', description: 'O\'qituvchi ismi (Rus)' })
  @IsString()
  @IsNotEmpty({ message: 'Rus tilidagi ism kiritilishi shart' })
  name_ru: string;

  @ApiProperty({ example: 'Jasur Aliyev', description: 'O\'qituvchi ismi (Ingliz)' })
  @IsString()
  @IsNotEmpty({ message: 'Ingliz tilidagi ism kiritilishi shart' })
  name_en: string;

  @ApiProperty({ example: 'Matematika o\'qituvchisi', description: 'Lavozim (O\'zbek)' })
  @IsString()
  @IsNotEmpty({ message: 'O\'zbek tilidagi lavozim kiritilishi shart' })
  position_uz: string;

  @ApiProperty({ example: 'Учитель математики', description: 'Lavozim (Rus)' })
  @IsString()
  @IsNotEmpty({ message: 'Rus tilidagi lavozim kiritilishi shart' })
  position_ru: string;

  @ApiProperty({ example: 'Mathematics Teacher', description: 'Lavozim (Ingliz)' })
  @IsString()
  @IsNotEmpty({ message: 'Ingliz tilidagi lavozim kiritilishi shart' })
  position_en: string;

  @ApiProperty({ example: 'Matematika fanidan 15 yillik tajribaga ega...', description: 'Biografiya (O\'zbek)', required: false })
  @IsString()
  @IsOptional()
  bio_uz?: string;

  @ApiProperty({ example: 'Имеет 15-летний опыт преподавания математики...', description: 'Biografiya (Rus)', required: false })
  @IsString()
  @IsOptional()
  bio_ru?: string;

  @ApiProperty({ example: 'Has 15 years of teaching experience in mathematics...', description: 'Biografiya (Ingliz)', required: false })
  @IsString()
  @IsOptional()
  bio_en?: string;

  @ApiProperty({ example: 'mathematics', description: 'Fan (ingliz tilida)' })
  @IsString()
  @IsNotEmpty({ message: 'Fan kiritilishi shart' })
  subject: string;

  @ApiProperty({ example: 'https://example.com/photo.jpg', description: 'O\'qituvchi fotosi URL', required: false })
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiProperty({ example: 'jasur@maktab.uz', description: 'Email', required: false })
  @IsEmail({}, { message: 'Email noto\'g\'ri formatda' })
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqam', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ 
    example: ['Oliy toifali o\'qituvchi', 'IELTS sertifikati'], 
    description: 'Sertifikatlar ro\'yxati', 
    required: false,
    type: [String]
  })
  @IsArray()
  @IsOptional()
  certifications?: string[];

  @ApiProperty({ 
    example: { facebook: 'https://fb.com/jasur', telegram: '@jasur' }, 
    description: 'Ijtimoiy tarmoqlar', 
    required: false 
  })
  @IsObject()
  @IsOptional()
  socialLinks?: object;

  @ApiProperty({ example: 15, description: 'Tajriba (yillar)', required: false })
  @IsNumber()
  @IsOptional()
  experience?: number;

  @ApiProperty({ 
    example: [{ university: 'TDPU', degree: 'Magistr', year: 2010 }], 
    description: 'Ta\'lim', 
    required: false 
  })
  @IsArray()
  @IsOptional()
  education?: object[];

  @ApiProperty({ example: 0, description: 'Tartib raqami (saralash uchun)', required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiProperty({ example: true, description: 'Faolmi?', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}