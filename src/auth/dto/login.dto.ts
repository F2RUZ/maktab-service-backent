import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin@maktab.uz',
    description: 'Admin email manzili',
  })
  @IsEmail({}, { message: 'Email noto\'g\'ri formatda' })
  @IsNotEmpty({ message: 'Email kiritilishi shart' })
  email: string;

  @ApiProperty({
    example: 'admin123456',
    description: 'Admin paroli',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty({ message: 'Parol kiritilishi shart' })
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak' })
  password: string;
}