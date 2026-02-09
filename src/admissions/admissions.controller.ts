import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdmissionsService } from './admissions.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { QueryApplicationDto } from './dto/query-application.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Admissions')
@Controller('admissions')
export class AdmissionsController {
  constructor(private readonly admissionsService: AdmissionsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Ariza yuborish (Public)', 
    description: 'Ota-onalar maktabga qabul uchun ariza yuborishlari mumkin. Hech qanday autentifikatsiya kerak emas!' 
  })
  @ApiResponse({ status: 201, description: 'Ariza muvaffaqiyatli yuborildi' })
  @ApiResponse({ status: 400, description: 'Ma\'lumotlar noto\'g\'ri' })
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.admissionsService.create(createApplicationDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Barcha arizalar (Admin)', 
    description: 'Faqat login qilgan admin barcha arizalarni ko\'ra oladi' 
  })
  @ApiResponse({ status: 200, description: 'Arizalar ro\'yxati va statistika' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  findAll(@Query() query: QueryApplicationDto) {
    return this.admissionsService.findAll(query);
  }

  @Get('statistics')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Arizalar statistikasi (Admin)', 
    description: 'Barcha arizalar bo\'yicha umumiy statistika' 
  })
  @ApiResponse({ status: 200, description: 'Statistika ma\'lumotlari' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  getStatistics() {
    return this.admissionsService.getStatistics();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Bitta ariza (Admin)', 
    description: 'ID bo\'yicha arizani to\'liq ko\'rish' 
  })
  @ApiResponse({ status: 200, description: 'Ariza topildi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  @ApiResponse({ status: 404, description: 'Ariza topilmadi' })
  findOne(@Param('id') id: string) {
    return this.admissionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Ariza holatini o\'zgartirish (Admin)', 
    description: 'Arizani tasdiqlash, rad etish yoki status o\'zgartirish' 
  })
  @ApiResponse({ status: 200, description: 'Ariza holati yangilandi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  @ApiResponse({ status: 404, description: 'Ariza topilmadi' })
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.admissionsService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Arizani o\'chirish (Admin)', 
    description: 'Faqat login qilgan admin o\'chirishi mumkin' 
  })
  @ApiResponse({ status: 200, description: 'Ariza muvaffaqiyatli o\'chirildi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  @ApiResponse({ status: 404, description: 'Ariza topilmadi' })
  remove(@Param('id') id: string) {
    return this.admissionsService.remove(id);
  }
}