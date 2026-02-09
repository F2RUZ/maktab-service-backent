import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateApplicationDto {
  @ApiProperty({ 
    example: 'APPROVED', 
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'CONTACTED'], 
    description: 'Ariza holati',
    required: false
  })
  @IsEnum(['PENDING', 'APPROVED', 'REJECTED', 'CONTACTED'])
  @IsOptional()
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CONTACTED';

  @ApiProperty({ 
    example: 'Ota-ona bilan bog\'lanildi, keyingi hafta intervyu belgilandi', 
    description: 'Admin izohi',
    required: false
  })
  @IsString()
  @IsOptional()
  adminNotes?: string;
}