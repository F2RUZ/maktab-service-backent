import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { QueryGalleryDto } from './dto/query-gallery.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Media qo\'shish (Admin)', 
    description: 'Foto, video yoki 360° virtual tur qo\'shish' 
  })
  @ApiResponse({ status: 201, description: 'Media muvaffaqiyatli qo\'shildi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  create(@Body() createGalleryDto: CreateGalleryDto) {
    return this.galleryService.create(createGalleryDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Barcha media (Public)', 
    description: 'Foto, video va virtual turlarni olish. Type va category bo\'yicha filtrlash mumkin' 
  })
  @ApiResponse({ status: 200, description: 'Galereya ma\'lumotlari' })
  findAll(@Query() query: QueryGalleryDto) {
    return this.galleryService.findAll(query);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Kategoriyalar ro\'yxati (Public)', description: 'Barcha mavjud kategoriyalar' })
  @ApiResponse({ status: 200, description: 'Kategoriyalar ro\'yxati' })
  getCategories() {
    return this.galleryService.getCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta media (Public)', description: 'ID bo\'yicha mediani olish' })
  @ApiResponse({ status: 200, description: 'Media topildi' })
  @ApiResponse({ status: 404, description: 'Media topilmadi' })
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Mediani tahrirlash (Admin)', description: 'Faqat login qilgan admin tahrirlashi mumkin' })
  @ApiResponse({ status: 200, description: 'Media muvaffaqiyatli yangilandi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  @ApiResponse({ status: 404, description: 'Media topilmadi' })
  update(@Param('id') id: string, @Body() updateGalleryDto: UpdateGalleryDto) {
    return this.galleryService.update(id, updateGalleryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Mediani o\'chirish (Admin)', description: 'Faqat login qilgan admin o\'chirishi mumkin' })
  @ApiResponse({ status: 200, description: 'Media muvaffaqiyatli o\'chirildi' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token kerak' })
  @ApiResponse({ status: 404, description: 'Media topilmadi' })
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}