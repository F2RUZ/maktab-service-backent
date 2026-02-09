import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsDateString, IsOptional, IsArray } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({ example: 'Sardor Mahmudov', description: 'Ota-ona ismi' })
  @IsString()
  @IsNotEmpty({ message: 'Ota-ona ismi kiritilishi shart' })
  parentName: string;

  @ApiProperty({ example: '+998901234567', description: 'Ota-ona telefon raqami' })
  @IsString()
  @IsNotEmpty({ message: 'Telefon raqam kiritilishi shart' })
  parentPhone: string;

  @ApiProperty({ example: 'sardor@example.com', description: 'Ota-ona email manzili' })
  @IsEmail({}, { message: "Email noto'g'ri formatda" })
  @IsNotEmpty({ message: 'Email kiritilishi shart' })
  parentEmail: string;

  @ApiProperty({ example: 'Ali Mahmudov', description: "O'quvchi ismi" })
  @IsString()
  @IsNotEmpty({ message: "O'quvchi ismi kiritilishi shart" })
  studentName: string;

  @ApiProperty({ example: '2015-03-15', description: "O'quvchi tug'ilgan sanasi (YYYY-MM-DD)" })
  @IsDateString({}, { message: "Sana noto'g'ri formatda (YYYY-MM-DD)" })
  @IsNotEmpty({ message: "Tug'ilgan sana kiritilishi shart" })
  studentBirthDate: string;

  @ApiProperty({ example: '1-sinf', description: 'Qaysi sinfga kirmoqchi' })
  @IsString()
  @IsNotEmpty({ message: 'Sinf kiritilishi shart' })
  studentGrade: string;

  @ApiProperty({
    example: ['https://example.com/birth-certificate.pdf', 'https://example.com/photo.jpg'],
    description: "Hujjatlar (tug'ilganlik guvohnomasi, foto, va boshqalar)",
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  documents?: string[];

  @ApiProperty({
    example: 'Bolam matematikaga qiziqadi...',
    description: "Qo'shimcha ma'lumot",
    required: false,
  })
  @IsString()
  @IsOptional()
  additionalInfo?: string;
}
