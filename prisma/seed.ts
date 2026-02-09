import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// .env faylini yuklash
config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Birinchi Super Admin yaratish
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@maktab.uz';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';

  // Agar admin mavjud bo'lsa, o'tkazib yuborish
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('✅ Super Admin allaqachon mavjud:', adminEmail);
    return;
  }

  // Parolni hash qilish
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Super Admin yaratish
  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Super Admin yaratildi:');
  console.log('   Email:', admin.email);
  console.log('   Parol:', adminPassword);
  console.log('   Role:', admin.role);
  console.log('');
  console.log('⚠️  MUHIM: Login uchun yuqoridagi ma\'lumotlarni ishlating!');
}

main()
  .catch((e) => {
    console.error('❌ Seed xatolik:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });