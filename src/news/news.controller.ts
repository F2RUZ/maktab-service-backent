import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { QueryNewsDto } from './dto/query-news.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Yangilik yaratish (Admin)', description: 'Faqat login qilgan admin yangilik yarata oladi' })
  @ApiResponse({ status: 201, description: 'Yangilik muvaffaqiyatli yaratildi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha yangiliklar (Public)', description: 'Pagination, filter va qidiruv bilan' })
  @ApiResponse({ status: 200, description: 'Yangiliklar ro\'yxati' })
  findAll(@Query() query: QueryNewsDto) {
    return this.newsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta yangilik (Public)', description: 'ID bo\'yicha yangilikni olish' })
  @ApiResponse({ status: 200, description: 'Yangilik topildi' })
  @ApiResponse({ status: 404, description: 'Yangilik topilmadi' })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Yangilikni tahrirlash (Admin)', description: 'Faqat login qilgan admin tahrirlashi mumkin' })
  @ApiResponse({ status: 200, description: 'Yangilik muvaffaqiyatli yangilandi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  @ApiResponse({ status: 404, description: 'Yangilik topilmadi' })
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Yangilikni o\'chirish (Admin)', description: 'Faqat login qilgan admin o\'chirishi mumkin' })
  @ApiResponse({ status: 200, description: 'Yangilik muvaffaqiyatli o\'chirildi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  @ApiResponse({ status: 404, description: 'Yangilik topilmadi' })
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }

  @Patch(':id/publish')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Yangilikni nashr qilish/bekor qilish (Admin)', description: 'Published holatini o\'zgartirish' })
  @ApiResponse({ status: 200, description: 'Holat muvaffaqiyatli o\'zgartirildi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  @ApiResponse({ status: 404, description: 'Yangilik topilmadi' })
  togglePublish(@Param('id') id: string) {
    return this.newsService.togglePublish(id);
  }
}