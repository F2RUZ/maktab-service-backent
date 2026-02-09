import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { QueryGalleryDto } from './dto/query-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async create(createGalleryDto: CreateGalleryDto) {
    const gallery = await this.prisma.gallery.create({
      data: createGalleryDto,
    });

    return {
      message: 'Media muvaffaqiyatli qo\'shildi',
      gallery,
    };
  }

  async findAll(query: QueryGalleryDto) {
    // Filter yaratish
    const where: any = {};

    if (query.type) {
      where.type = query.type;
    }

    if (query.category) {
      where.category = query.category;
    }

    const gallery = await this.prisma.gallery.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    // Type bo'yicha guruhlash
    const grouped = {
      photos: gallery.filter(item => item.type === 'PHOTO'),
      videos: gallery.filter(item => item.type === 'VIDEO'),
      virtualTours: gallery.filter(item => item.type === 'VIRTUAL_TOUR'),
    };

    return {
      data: gallery,
      grouped,
      total: gallery.length,
    };
  }

  async findOne(id: string) {
    const gallery = await this.prisma.gallery.findUnique({
      where: { id },
    });

    if (!gallery) {
      throw new NotFoundException('Media topilmadi');
    }

    return gallery;
  }

  async update(id: string, updateGalleryDto: UpdateGalleryDto) {
    const gallery = await this.prisma.gallery.findUnique({ where: { id } });

    if (!gallery) {
      throw new NotFoundException('Media topilmadi');
    }

    const updated = await this.prisma.gallery.update({
      where: { id },
      data: updateGalleryDto,
    });

    return {
      message: 'Media muvaffaqiyatli yangilandi',
      gallery: updated,
    };
  }

  async remove(id: string) {
    const gallery = await this.prisma.gallery.findUnique({ where: { id } });

    if (!gallery) {
      throw new NotFoundException('Media topilmadi');
    }

    await this.prisma.gallery.delete({ where: { id } });

    return {
      message: 'Media muvaffaqiyatli o\'chirildi',
    };
  }

  // Kategoriyalar ro'yxatini olish
  async getCategories() {
    const categories = await this.prisma.gallery.findMany({
      select: { category: true },
      distinct: ['category'],
    });

    return {
      categories: categories.map(c => c.category),
    };
  }
}