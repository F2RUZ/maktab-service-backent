import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export class QueryGalleryDto {
  @ApiProperty({ 
    example: 'PHOTO', 
    enum: ['PHOTO', 'VIDEO', 'VIRTUAL_TOUR'], 
    description: 'Media turi bo\'yicha filtrlash', 
    required: false 
  })
  @IsEnum(['PHOTO', 'VIDEO', 'VIRTUAL_TOUR'])
  @IsOptional()
  type?: 'PHOTO' | 'VIDEO' | 'VIRTUAL_TOUR';

  @ApiProperty({ 
    example: 'events', 
    description: 'Kategoriya bo\'yicha filtrlash', 
    required: false 
  })
  @IsString()
  @IsOptional()
  category?: string;
}