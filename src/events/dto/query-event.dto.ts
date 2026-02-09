import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn } from 'class-validator';

export class QueryEventDto {
  @ApiProperty({
    example: 'upcoming',
    description: "Vaqt bo'yicha (upcoming - bo'lajak, past - o'tgan)",
    required: false,
    enum: ['upcoming', 'past', 'all'],
  })
  @IsString()
  @IsOptional()
  @IsIn(['upcoming', 'past', 'all'])
  status?: string;

  @ApiProperty({
    example: 'holiday',
    description: "Kategoriya bo'yicha filtrlash",
    required: false,
  })
  @IsString()
  @IsOptional()
  category?: string;
}
