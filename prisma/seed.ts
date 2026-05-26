import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    id: '1',
    name: 'Cable Knit Jumper Dress',
    description: "Lo'gay rangli zamonaviy uslubdagi an'anaviy ko'ylak — Toshkentning eng yaxshi tikuvchilaridan.",
    price: 35.99,
    image: '/images/ai-generated/product_blue_grey.jpg',
    category: "Women's Tops",
    collection: 'Осенняя коллекция',
    isNew: true,
  },
  {
    id: '2',
    name: 'V-Neck Graphic Sweater',
    description: 'Oq tusli, oltin tikuvli klassika — har qanday tantanaga mos.',
    price: 42.0,
    image: '/images/ai-generated/product_white_gold.jpg',
    category: "Women's Tops",
    collection: 'Осенняя коллекция',
    isNew: true,
  },
  {
    id: '3',
    name: 'Short Sleeve Knit Tee',
    description: "Qora rangli, rang-barang naqshli ko'ylak — kechki yig'ilishlar uchun.",
    price: 28.5,
    image: '/images/ai-generated/product_black_embroidered.jpg',
    category: "Women's Tops",
    collection: 'Летняя коллекция',
    isNew: true,
  },
  {
    id: '4',
    name: 'Donegal Sweater',
    description: 'Mint yashil, oltin chiziqli — bahor uchun yorqin tanlov.',
    price: 55.0,
    image: '/images/ai-generated/product_mint_gold.jpg',
    category: "Women's Tops",
    collection: 'Весенняя коллекция',
    isNew: true,
  },
  {
    id: '5',
    name: 'Soft Hybrid Round Neck Top',
    description: 'Yorqin yashil, qulay va engil mato — yozgi kunlar uchun.',
    price: 30.0,
    image: '/images/ai-generated/product_green.jpg',
    category: "Women's Tops",
    collection: 'Летняя коллекция',
    isNew: true,
  },
  {
    id: '6',
    name: 'Low Count Crew Neck T-shirt',
    description: "Burgundi rangli, shabnam yengli ko'ylak.",
    price: 24.99,
    image: '/images/ai-generated/product_burgundy_sheer.jpg',
    category: "Women's Tops",
    collection: 'Летняя коллекция',
    isNew: false,
  },
  {
    id: '7',
    name: 'Boyfriend Long Tee',
    description: "Erkin kesim, plash-uslubdagi yengli oq ko'ylak.",
    price: 29.99,
    image: '/images/ai-generated/product_white_cape.jpg',
    category: "Women's Tops",
    collection: 'Весенняя коллекция',
    isNew: false,
  },
  {
    id: '8',
    name: 'Oversize Heavy T-shirt',
    description: 'Erkin shakl, yorqin yashil rang.',
    price: 32.0,
    image: '/images/ai-generated/product_green.jpg',
    category: "Women's Tops",
    collection: 'Летняя коллекция',
    isNew: false,
  },
  {
    id: '9',
    name: 'Cream Wool Rag Jumper',
    description: "Bejli, qo'l ishi tikuvli — qish uchun maxsus.",
    price: 65.0,
    image: '/images/ai-generated/product_beige_embroidered.jpg',
    category: "Women's Tops",
    collection: 'Зимняя коллекция',
    isNew: false,
  },
  {
    id: '10',
    name: 'Rainbow Elbow Patch Jumper',
    description: "To'liq bo'yli burgundi ko'ylak — kuzgi yig'ilishlar uchun.",
    price: 49.0,
    image: '/images/ai-generated/product_burgundy_dress.jpg',
    category: "Women's Tops",
    collection: 'Осенняя коллекция',
    isNew: false,
  },
  {
    id: '11',
    name: 'Velvet Festive Set',
    description: 'Baxmal mato, bayram uchun moslashgan.',
    price: 78.0,
    image: '/images/ai-generated/product_burgundy_sheer.jpg',
    category: "Women's Tops",
    collection: 'Зимняя коллекция',
    isNew: true,
  },
  {
    id: '12',
    name: 'Gold Embroidered Tunic',
    description: "Oltin tikuvli, an'anaviy uslubdagi tunika.",
    price: 58.0,
    image: '/images/ai-generated/product_white_gold.jpg',
    category: "Women's Tops",
    collection: 'Весенняя коллекция',
    isNew: false,
  },
];

async function main() {
  console.log('Seeding database...');

  // Clear existing products
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  // Insert products
  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
