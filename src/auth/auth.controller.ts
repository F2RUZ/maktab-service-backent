import { Controller, Post, Get, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Admin login', 
    description: 'Email va parol bilan login qilish va JWT token olish' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login muvaffaqiyatli. JWT token qaytariladi' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Email yoki parol noto\'g\'ri' 
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Yangi admin yaratish (Protected)', 
    description: 'Faqat login qilgan admin yangi admin yarata oladi. JWT token kerak!' 
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Yangi admin muvaffaqiyatli yaratildi' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - JWT token kerak' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Bu email allaqachon ro\'yxatdan o\'tgan' 
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'O\'z profilingizni ko\'rish (Protected)', 
    description: 'Login qilgan adminning o\'z ma\'lumotlari. JWT token kerak!' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Profil ma\'lumotlari' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - JWT token kerak' 
  })
  async getProfile(@CurrentUser() user: any) {
    return this.authService.getProfile(user.id);
  }
}