import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { QueryAchievementDto } from './dto/query-achievement.dto';

@Injectable()
export class AchievementsService {
  constructor(private prisma: PrismaService) {}

  async create(createAchievementDto: CreateAchievementDto) {
    const achievement = await this.prisma.achievement.create({
      data: createAchievementDto,
    });

    return {
      message: 'Yutuq muvaffaqiyatli qo\'shildi',
      achievement,
    };
  }

  async findAll(query: QueryAchievementDto) {
    // Filter yaratish
    const where: any = {};

    if (query.category) {
      where.category = query.category;
    }

    if (query.year) {
      where.year = parseInt(query.year);
    }

    const achievements = await this.prisma.achievement.findMany({
      where,
      orderBy: [
        { year: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    // Yil bo'yicha guruhlash
    const groupedByYear: { [key: number]: any[] } = {};
    achievements.forEach(achievement => {
      if (!groupedByYear[achievement.year]) {
        groupedByYear[achievement.year] = [];
      }
      groupedByYear[achievement.year].push(achievement);
    });

    // Kategoriya bo'yicha guruhlash
    const groupedByCategory: { [key: string]: any[] } = {};
    achievements.forEach(achievement => {
      if (!groupedByCategory[achievement.category]) {
        groupedByCategory[achievement.category] = [];
      }
      groupedByCategory[achievement.category].push(achievement);
    });

    return {
      data: achievements,
      groupedByYear,
      groupedByCategory,
      total: achievements.length,
    };
  }

  async findOne(id: string) {
    const achievement = await this.prisma.achievement.findUnique({
      where: { id },
    });

    if (!achievement) {
      throw new NotFoundException('Yutuq topilmadi');
    }

    return achievement;
  }

  async update(id: string, updateAchievementDto: UpdateAchievementDto) {
    const achievement = await this.prisma.achievement.findUnique({ where: { id } });

    if (!achievement) {
      throw new NotFoundException('Yutuq topilmadi');
    }

    const updated = await this.prisma.achievement.update({
      where: { id },
      data: updateAchievementDto,
    });

    return {
      message: 'Yutuq muvaffaqiyatli yangilandi',
      achievement: updated,
    };
  }

  async remove(id: string) {
    const achievement = await this.prisma.achievement.findUnique({ where: { id } });

    if (!achievement) {
      throw new NotFoundException('Yutuq topilmadi');
    }

    await this.prisma.achievement.delete({ where: { id } });

    return {
      message: 'Yutuq muvaffaqiyatli o\'chirildi',
    };
  }

  // Yillar ro'yxati
  async getYears() {
    const years = await this.prisma.achievement.findMany({
      select: { year: true },
      distinct: ['year'],
      orderBy: { year: 'desc' },
    });

    return {
      years: years.map(y => y.year),
    };
  }

  // Kategoriyalar ro'yxati
  async getCategories() {
    const categories = await this.prisma.achievement.findMany({
      select: { category: true },
      distinct: ['category'],
    });

    return {
      categories: categories.map(c => c.category),
    };
  }
}