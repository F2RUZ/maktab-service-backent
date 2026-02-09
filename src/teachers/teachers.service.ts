import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { QueryTeacherDto } from './dto/query-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const teacher = await this.prisma.teacher.create({
      data: createTeacherDto,
    });

    return {
      message: 'O\'qituvchi muvaffaqiyatli qo\'shildi',
      teacher,
    };
  }

  async findAll(query: QueryTeacherDto) {
    // Filter yaratish
    const where: any = {};

    if (query.subject) {
      where.subject = query.subject;
    }

    if (query.isActive === 'true') {
      where.isActive = true;
    }

    const teachers = await this.prisma.teacher.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return {
      data: teachers,
      total: teachers.length,
    };
  }

  async findOne(id: string) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
    });

    if (!teacher) {
      throw new NotFoundException('O\'qituvchi topilmadi');
    }

    return teacher;
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });

    if (!teacher) {
      throw new NotFoundException('O\'qituvchi topilmadi');
    }

    const updated = await this.prisma.teacher.update({
      where: { id },
      data: updateTeacherDto,
    });

    return {
      message: 'O\'qituvchi ma\'lumotlari muvaffaqiyatli yangilandi',
      teacher: updated,
    };
  }

  async remove(id: string) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });

    if (!teacher) {
      throw new NotFoundException('O\'qituvchi topilmadi');
    }

    await this.prisma.teacher.delete({ where: { id } });

    return {
      message: 'O\'qituvchi muvaffaqiyatli o\'chirildi',
    };
  }
}