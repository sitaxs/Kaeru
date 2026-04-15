import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req: Request, res: Response) => {
  res.send('KAERU Backend is running! 🐸');
});

// --- 🔐 АВТОРИЗАЦІЯ ---

// 1. РЕЄСТРАЦІЯ НОВОГО КОРИСТУВАЧА
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    
    const newUser = await prisma.user.create({
      data: {
        email,
        password, // Поки без шифрування для тестів
        name,
        role: "USER"
      }
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Помилка реєстрації:", error);
    res.status(400).json({ error: "Користувач з таким email вже існує" });
  }
});

// 2. ВХІД (LOGIN)
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        password: password
      }
    });

    if (!user) {
      return res.status(401).json({ error: "Неправильний email або пароль" });
    }

    // Віддаємо дані користувача на фронтенд
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: "Помилка сервера при вході" });
  }
});

// --- 📅 ІВЕНТИ ---

// Отримати всі івенти
app.get('/api/events', async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        organizer: true,
        category: true, // Одразу дістаємо інформацію про категорію
        reviews: true 
      }
    });
    res.json(events);
  } catch (error) {
    console.error("Помилка при отриманні івентів:", error);
    res.status(500).json({ error: "Не вдалося завантажити події" });
  }
});

// Створити новий івент44
app.post('/api/events', async (req: Request, res: Response) => {
  try {
    const { 
      title, date, location, price, paymentType, 
      category, 
      imageUrl, tags, description, organizerId 
    } = req.body;

    const newEvent = await prisma.event.create({
      data: {
        title,
        date,
        location,
        price: price || null,
        paymentType: paymentType || "free",
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        tags: tags || [], 
        add_tags: [], // <--- ОСЬ ТЕ, ЩО МИ ЗАБУЛИ ДОДАТИ!
        description: description || "",
        status: "active",
        organizerId, 
        category: {
          connectOrCreate: {
            where: { name: category || "IT & Tech" },
            create: { name: category || "IT & Tech" }
          }
        }
      }
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Помилка при створенні івенту:", error);
    res.status(500).json({ error: "Не вдалося зберегти подію в базу" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер успішно запущено на http://localhost:${PORT}`);
});