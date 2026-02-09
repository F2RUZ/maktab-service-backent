import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('General')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'API ma\'lumotlari', description: 'Barcha mavjud endpointlar haqida ma\'lumot' })
  @ApiResponse({ status: 200, description: 'API ma\'lumotlari muvaffaqiyatli qaytarildi' })
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({ summary: 'Server health check', description: 'Serverning ishlayotganini tekshirish' })
  @ApiResponse({ status: 200, description: 'Server sog\'lom ishlayapti' })
  healthCheck(): object {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
