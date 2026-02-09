import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { QueryNewsDto } from './dto/query-news.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  // Slug yaratish (URL-friendly)
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 100);
  }

  // Unique slug yaratish
  private async generateUniqueSlug(baseSlug: string): Promise<string> {
    let slug = baseSlug;
    let counter = 1;

    while (await this.prisma.news.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }

  async create(createNewsDto: CreateNewsDto) {
    const baseSlug = this.generateSlug(createNewsDto.title_uz);
    const slug = await this.generateUniqueSlug(baseSlug);

    const news = await this.prisma.news.create({
      data: {
        ...createNewsDto,
        slug,
        publishedAt: createNewsDto.published ? new Date() : null,
      },
    });

    return {
      message: 'Yangilik muvaffaqiyatli yaratildi',
      news,
    };
  }

  async findAll(query: QueryNewsDto) {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '10');
    const skip = (page - 1) * limit;

    // Filter yaratish
    const where: any = {};

    if (query.category) {
      where.category = query.category;
    }

    if (query.published === 'true') {
      where.published = true;
    }

    if (query.search) {
      where.OR = [
        { title_uz: { contains: query.search, mode: 'insensitive' } },
        { title_ru: { contains: query.search, mode: 'insensitive' } },
        { title_en: { contains: query.search, mode: 'insensitive' } },
        { content_uz: { contains: query.search, mode: 'insensitive' } },
        { content_ru: { contains: query.search, mode: 'insensitive' } },
        { content_en: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    // Total count
    const total = await this.prisma.news.count({ where });

    // Data
    const news = await this.prisma.news.findMany({
      where,
      skip,
      take: limit,
      orderBy: { publishedAt: 'desc' },
    });

    return {
      data: news,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const news = await this.prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      throw new NotFoundException('Yangilik topilmadi');
    }

    // Views counter ni oshirish
    await this.prisma.news.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return news;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    const news = await this.prisma.news.findUnique({ where: { id } });

    if (!news) {
      throw new NotFoundException('Yangilik topilmadi');
    }

    // Agar title_uz o'zgarsa, slug ni yangilash
    let slug = news.slug;
    if (updateNewsDto.title_uz && updateNewsDto.title_uz !== news.title_uz) {
      const baseSlug = this.generateSlug(updateNewsDto.title_uz);
      slug = await this.generateUniqueSlug(baseSlug);
    }

    const updated = await this.prisma.news.update({
      where: { id },
      data: {
        ...updateNewsDto,
        slug,
      },
    });

    return {
      message: 'Yangilik muvaffaqiyatli yangilandi',
      news: updated,
    };
  }

  async remove(id: string) {
    const news = await this.prisma.news.findUnique({ where: { id } });

    if (!news) {
      throw new NotFoundException('Yangilik topilmadi');
    }

    await this.prisma.news.delete({ where: { id } });

    return {
      message: 'Yangilik muvaffaqiyatli o\'chirildi',
    };
  }

  async togglePublish(id: string) {
    const news = await this.prisma.news.findUnique({ where: { id } });

    if (!news) {
      throw new NotFoundException('Yangilik topilmadi');
    }

    const updated = await this.prisma.news.update({
      where: { id },
      data: {
        published: !news.published,
        publishedAt: !news.published ? new Date() : null,
      },
    });

    return {
      message: updated.published ? 'Yangilik nashr qilindi' : 'Yangilik nashrdan olib tashlandi',
      news: updated,
    };
  }
}