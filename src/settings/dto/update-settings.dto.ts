import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsNumber } from 'class-validator';

export class UpdateSettingsDto {
  @ApiProperty({ required: false }) @IsString() @IsOptional() schoolName_uz?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() schoolName_ru?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() schoolName_en?: string;

  @ApiProperty({ example: '+998901234567', required: false })
  @IsString()
  @IsOptional()
  phone?: string;
  @ApiProperty({ example: 'info@school.uz', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false }) @IsString() @IsOptional() address_uz?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() address_ru?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() address_en?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() googleMapsUrl?: string;

  @ApiProperty({ required: false }) @IsString() @IsOptional() telegram?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() instagram?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() facebook?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() youtube?: string;

  @ApiProperty({ required: false }) @IsNumber() @IsOptional() studentsCount?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() teachersCount?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() graduatesCount?: number;

  @ApiProperty({ required: false }) @IsString() @IsOptional() logo?: string;
}
