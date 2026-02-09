import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { QueryApplicationDto } from './dto/query-application.dto';

@Injectable()
export class AdmissionsService {
  constructor(private prisma: PrismaService) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const application = await this.prisma.application.create({
      data: {
        ...createApplicationDto,
        studentBirthDate: new Date(createApplicationDto.studentBirthDate),
      },
    });

    return {
      message: 'Arizangiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.',
      application: {
        id: application.id,
        status: application.status,
        createdAt: application.createdAt,
      },
    };
  }

  async findAll(query: QueryApplicationDto) {
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '20');
    const skip = (page - 1) * limit;

    // Filter yaratish
    const where: any = {};

    if (query.status) {
      where.status = query.status;
    }

    // Total count
    const total = await this.prisma.application.count({ where });

    // Data
    const applications = await this.prisma.application.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    // Statistics
    const stats = await this.prisma.application.groupBy({
      by: ['status'],
      _count: true,
    });

    const statistics = {
      total,
      pending: stats.find(s => s.status === 'PENDING')?._count || 0,
      approved: stats.find(s => s.status === 'APPROVED')?._count || 0,
      rejected: stats.find(s => s.status === 'REJECTED')?._count || 0,
      contacted: stats.find(s => s.status === 'CONTACTED')?._count || 0,
    };

    return {
      data: applications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      statistics,
    };
  }

  async findOne(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException('Ariza topilmadi');
    }

    return application;
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    const application = await this.prisma.application.findUnique({ where: { id } });

    if (!application) {
      throw new NotFoundException('Ariza topilmadi');
    }

    const updated = await this.prisma.application.update({
      where: { id },
      data: updateApplicationDto,
    });

    return {
      message: 'Ariza holati muvaffaqiyatli yangilandi',
      application: updated,
    };
  }

  async remove(id: string) {
    const application = await this.prisma.application.findUnique({ where: { id } });

    if (!application) {
      throw new NotFoundException('Ariza topilmadi');
    }

    await this.prisma.application.delete({ where: { id } });

    return {
      message: 'Ariza muvaffaqiyatli o\'chirildi',
    };
  }

  // Statistika
  async getStatistics() {
    const total = await this.prisma.application.count();
    
    const stats = await this.prisma.application.groupBy({
      by: ['status'],
      _count: true,
    });

    const thisMonth = await this.prisma.application.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    });

    return {
      total,
      thisMonth,
      byStatus: {
        pending: stats.find(s => s.status === 'PENDING')?._count || 0,
        approved: stats.find(s => s.status === 'APPROVED')?._count || 0,
        rejected: stats.find(s => s.status === 'REJECTED')?._count || 0,
        contacted: stats.find(s => s.status === 'CONTACTED')?._count || 0,
      },
    };
  }
}