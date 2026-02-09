import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { QueryEventDto } from './dto/query-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const { startDate, endDate, ...rest } = createEventDto;

    const event = await this.prisma.event.create({
      data: {
        ...rest,
        startDate: new Date(startDate), // String -> DateTime
        endDate: endDate ? new Date(endDate) : null, // String -> DateTime (agar bor bo'lsa)
      },
    });

    return {
      message: 'Tadbir muvaffaqiyatli yaratildi',
      event,
    };
  }

  async findAll(query: QueryEventDto) {
    const { status, category } = query;
    const now = new Date();

    // Filter yig'ish
    const where: any = {
      isPublic: true, // Default holatda faqat public tadbirlarni ko'rsatish (Admin panel uchun buni o'chirib qo'yish mumkin)
    };

    if (category) {
      where.category = category;
    }

    // Vaqt bo'yicha filter (startDate ga asoslanib)
    if (status === 'upcoming') {
      where.startDate = { gte: now }; // Kelajakdagi
    } else if (status === 'past') {
      where.startDate = { lt: now }; // O'tib ketgan
    }

    // Tartiblash
    const orderBy = status === 'past' ? { startDate: 'desc' } : { startDate: 'asc' };

    const events = await this.prisma.event.findMany({
      where,
      orderBy: orderBy as any,
    });

    const total = events.length;
    // Kelajakdagi tadbirlar soni
    const upcomingCount = await this.prisma.event.count({
      where: {
        startDate: { gte: now },
        isPublic: true,
      },
    });

    return {
      data: events,
      meta: {
        total,
        upcomingCount,
        filter: status || 'all',
      },
    };
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Tadbir topilmadi');
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    await this.findOne(id); // Mavjudligini tekshirish

    const { startDate, endDate, ...rest } = updateEventDto;
    const data: any = { ...rest };

    if (startDate) {
      data.startDate = new Date(startDate);
    }

    if (endDate) {
      data.endDate = new Date(endDate);
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id },
      data,
    });

    return {
      message: 'Tadbir yangilandi',
      event: updatedEvent,
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.event.delete({
      where: { id },
    });

    return {
      message: "Tadbir o'chirildi",
    };
  }
}
