import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: 'Maktab Backend API',
      version: '1.0.0',
      docs: '/api',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth',
        news: '/api/news',
        teachers: '/api/teachers',
        gallery: '/api/gallery',
        achievements: '/api/achievements',
        admissions: '/api/admissions',
        events: '/api/events',
        settings: '/api/settings',
      },
    };
  }
}
