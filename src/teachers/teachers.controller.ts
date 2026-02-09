import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { QueryTeacherDto } from './dto/query-teacher.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'O\'qituvchi qo\'shish (Admin)', description: 'Faqat login qilgan admin qo\'sha oladi' })
  @ApiResponse({ status: 201, description: 'O\'qituvchi muvaffaqiyatli qo\'shildi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha o\'qituvchilar (Public)', description: 'Filter bilan barcha o\'qituvchilar' })
  @ApiResponse({ status: 200, description: 'O\'qituvchilar ro\'yxati' })
  findAll(@Query() query: QueryTeacherDto) {
    return this.teachersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta o\'qituvchi (Public)', description: 'ID bo\'yicha o\'qituvchini olish' })
  @ApiResponse({ status: 200, description: 'O\'qituvchi topildi' })
  @ApiResponse({ status: 404, description: 'O\'qituvchi topilmadi' })
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'O\'qituvchini tahrirlash (Admin)', description: 'Faqat login qilgan admin tahrirlashi mumkin' })
  @ApiResponse({ status: 200, description: 'O\'qituvchi muvaffaqiyatli yangilandi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  @ApiResponse({ status: 404, description: 'O\'qituvchi topilmadi' })
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'O\'qituvchini o\'chirish (Admin)', description: 'Faqat login qilgan admin o\'chirishi mumkin' })
  @ApiResponse({ status: 200, description: 'O\'qituvchi muvaffaqiyatli o\'chirildi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  @ApiResponse({ status: 404, description: 'O\'qituvchi topilmadi' })
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}