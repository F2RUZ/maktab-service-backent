import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({
    example: 'editor@maktab.uz',
    description: 'Yangi admin email manzili',
  })
  @IsEmail({}, { message: 'Email noto\'g\'ri formatda' })
  @IsNotEmpty({ message: 'Email kiritilishi shart' })
  email: string;

  @ApiProperty({
    example: 'Editor123!',
    description: 'Yangi admin paroli',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty({ message: 'Parol kiritilishi shart' })
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak' })
  password: string;

  @ApiProperty({
    example: 'Jasur Aliyev',
    description: 'Admin ismi',
  })
  @IsString()
  @IsNotEmpty({ message: 'Ism kiritilishi shart' })
  name: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Admin roli',
    enum: Role,
    default: Role.ADMIN,
  })
  @IsEnum(Role, { message: 'Role noto\'g\'ri (SUPER_ADMIN, ADMIN, EDITOR)' })
  @IsOptional()
  role?: Role;
}