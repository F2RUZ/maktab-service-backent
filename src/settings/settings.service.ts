import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  // Sayt sozlamalarini olish
  async getSettings() {
    let settings = await this.prisma.setting.findFirst({
      where: { id: 1 }, // Tirnoqsiz yozing
    });

    if (!settings) {
      settings = await this.prisma.setting.create({
        data: { id: 1 }, // Tirnoqsiz yozing
      });
    }

    return settings;
  }

  // Sozlamalarni yangilash (Upsert)
  async updateSettings(updateSettingsDto: UpdateSettingsDto) {
    const settings = await this.prisma.setting.upsert({
      where: { id: 1 }, // Tirnoqsiz yozing
      update: updateSettingsDto,
      create: { id: 1, ...updateSettingsDto }, // Tirnoqsiz yozing
    });

    return {
      message: 'Sozlamalar muvaffaqiyatli yangilandi',
      settings,
    };
  }
}
