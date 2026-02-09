# 12-Maktab Backend

Maktab veb-sayti uchun backend API - NestJS + PostgreSQL + Prisma

## 📋 Texnologiyalar

- **NestJS** - Backend framework
- **PostgreSQL** - Database
- **Prisma** - ORM
- **JWT** - Authentication
- **Multer** - File upload
- **TypeScript** - Programming language

## 🚀 O'rnatish

### 1. Dependencies o'rnatish

```bash
npm install
```

### 2. Environment variables sozlash

`.env.example` faylini `.env` deb nomilab, ichidagi ma'lumotlarni o'zgartiring:

```bash
cp .env.example .env
```

### 3. PostgreSQL database yaratish

```bash
# PostgreSQL ga kirish
psql -U postgres

# Database yaratish
CREATE DATABASE maktab_db;
```

### 4. Prisma setup

```bash
# Prisma schema generate qilish
npx prisma generate

# Database migration
npx prisma migrate dev --name init

# Prisma Studio (optional - database ko'rish)
npx prisma studio
```

### 5. Serverni ishga tushirish

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

Server `http://localhost:3000` da ishga tushadi

## 📁 Folder Structure

```
12-maktab-backend/
├── src/
│   ├── auth/              # Authentication module
│   ├── news/              # Yangiliklar module
│   ├── teachers/          # O'qituvchilar module
│   ├── gallery/           # Galereya module
│   ├── achievements/      # Yutuqlar module
│   ├── admissions/        # Qabul/Arizalar module
│   ├── events/            # Tadbirlar module
│   ├── settings/          # Sayt sozlamalari module
│   ├── upload/            # File upload module
│   ├── common/            # Umumiy utilities
│   ├── prisma/            # Prisma service
│   ├── app.module.ts      # Main module
│   └── main.ts            # Entry point
├── prisma/
│   └── schema.prisma      # Database schema
├── uploads/               # Yuklangan fayllar
└── test/                  # Tests
```

## 🔑 API Endpoints

### Authentication
- `POST /auth/login` - Admin login
- `POST /auth/register` - Admin register
- `GET /auth/profile` - Get profile (protected)

### News (Yangiliklar)
- `GET /news` - Barcha yangiliklar
- `GET /news/:id` - Bitta yangilik
- `POST /news` - Yangilik qo'shish (admin)
- `PUT /news/:id` - Yangilikni tahrirlash (admin)
- `DELETE /news/:id` - Yangilikni o'chirish (admin)

### Teachers (O'qituvchilar)
- `GET /teachers` - Barcha o'qituvchilar
- `GET /teachers/:id` - Bitta o'qituvchi
- `POST /teachers` - O'qituvchi qo'shish (admin)
- `PUT /teachers/:id` - O'qituvchini tahrirlash (admin)
- `DELETE /teachers/:id` - O'qituvchini o'chirish (admin)

### Gallery (Galereya)
- `GET /gallery` - Barcha media
- `POST /gallery` - Media yuklash (admin)
- `DELETE /gallery/:id` - Media o'chirish (admin)

### va hokazo...

## 🛠️ Development

```bash
# Format code
npm run format

# Lint
npm run lint

# Tests
npm run test
```

## 📝 Notes

- Barcha admin endpointlar JWT authentication talab qiladi
- File upload maksimal hajmi: 10MB
- Multi-language qo'llab-quvvatlanadi (uz, ru, en)
# maktab-service-backent
