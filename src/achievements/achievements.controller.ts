import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { QueryAchievementDto } from './dto/query-achievement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Achievements')
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Yutuq qo\'shish (Admin)', 
    description: 'Olimpiada, sport yoki boshqa yutuqlarni qo\'shish' 
  })
  @ApiResponse({ status: 201, description: 'Yutuq muvaffaqiyatli qo\'shildi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  create(@Body() createAchievementDto: CreateAchievementDto) {
    return this.achievementsService.create(createAchievementDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Barcha yutuqlar (Public)', 
    description: 'Yil va kategoriya bo\'yicha filtrlash mumkin. Timeline formatida qaytariladi' 
  })
  @ApiResponse({ status: 200, description: 'Yutuqlar ro\'yxati' })
  findAll(@Query() query: QueryAchievementDto) {
    return this.achievementsService.findAll(query);
  }

  @Get('years')
  @ApiOperation({ summary: 'Yillar ro\'yxati (Public)', description: 'Barcha mavjud yillar' })
  @ApiResponse({ status: 200, description: 'Yillar ro\'yxati' })
  getYears() {
    return this.achievementsService.getYears();
  }

  @Get('categories')
  @ApiOperation({ summary: 'Kategoriyalar ro\'yxati (Public)', description: 'Barcha mavjud kategoriyalar' })
  @ApiResponse({ status: 200, description: 'Kategoriyalar ro\'yxati' })
  getCategories() {
    return this.achievementsService.getCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta yutuq (Public)', description: 'ID bo\'yicha yutuqni olish' })
  @ApiResponse({ status: 200, description: 'Yutuq topildi' })
  @ApiResponse({ status: 404, description: 'Yutuq topilmadi' })
  findOne(@Param('id') id: string) {
    return this.achievementsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Yutuqni tahrirlash (Admin)', description: 'Faqat login qilgan admin tahrirlashi mumkin' })
  @ApiResponse({ status: 200, description: 'Yutuq muvaffaqiyatli yangilandi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  @ApiResponse({ status: 404, description: 'Yutuq topilmadi' })
  update(@Param('id') id: string, @Body() updateAchievementDto: UpdateAchievementDto) {
    return this.achievementsService.update(id, updateAchievementDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Yutuqni o\'chirish (Admin)', description: 'Faqat login qilgan admin o\'chirishi mumkin' })
  @ApiResponse({ status: 200, description: 'Yutuq muvaffaqiyatli o\'chirildi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  @ApiResponse({ status: 404, description: 'Yutuq topilmadi' })
  remove(@Param('id') id: string) {
    return this.achievementsService.remove(id);
  }
}