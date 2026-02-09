import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma database ga ulandi');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('❌ Prisma database dan uzildi');
  }

  // Helper method - soft delete
  async softDelete(model: any, id: string) {
    return model.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // Helper method - clean query
  cleanForQuery(obj: any) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== ''),
    );
  }
}
