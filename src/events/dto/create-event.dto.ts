import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsBoolean, IsIn } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: "Navro'z bayrami", description: "Tadbir nomi (O'zbek)" })
  @IsString()
  @IsNotEmpty()
  title_uz: string;

  @ApiProperty({ example: 'Праздник Навруз', description: 'Tadbir nomi (Rus)' })
  @IsString()
  @IsNotEmpty()
  title_ru: string;

  @ApiProperty({ example: 'Navruz Holiday', description: 'Tadbir nomi (Ingliz)' })
  @IsString()
  @IsNotEmpty()
  title_en: string;

  @ApiProperty({
    example: 'Maktab hovlisida...',
    description: "Tadbir haqida (O'zbek)",
    required: false,
  })
  @IsString()
  @IsOptional()
  description_uz?: string;

  @ApiProperty({
    example: 'В школьном дворе...',
    description: 'Tadbir haqida (Rus)',
    required: false,
  })
  @IsString()
  @IsOptional()
  description_ru?: string;

  @ApiProperty({
    example: 'In the school yard...',
    description: 'Tadbir haqida (Ingliz)',
    required: false,
  })
  @IsString()
  @IsOptional()
  description_en?: string;

  @ApiProperty({
    example: 'holiday',
    description: 'Kategoriya (exam, holiday, meeting, sports)',
    enum: ['exam', 'holiday', 'meeting', 'sports'],
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: '2024-03-21T09:00:00.000Z', description: 'Boshlanish vaqti' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    example: '2024-03-21T12:00:00.000Z',
    description: 'Tugash vaqti',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({ example: 'Faollar zali', description: 'Manzil', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    example: true,
    description: "Saytda ko'rinishi (Public)",
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Rasm URL',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;
}
