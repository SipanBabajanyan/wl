# Pideh Armenia - Интернет-магазин мини-пицц

Мини-пиццы в виде аджарских хачапури. Лодочки с начинкой как у пиццы.

## 🚀 Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск базы данных PostgreSQL
brew services start postgresql@15

# Создание базы данных
psql postgres -c "CREATE DATABASE pideh_armenia;"

# Применение миграций
npx prisma migrate dev

# Заполнение тестовыми данными
npx tsx scripts/seed.ts

# Запуск приложения
npm run dev
```

## 📁 Структура проекта

```
app/
├── src/
│   ├── app/
│   │   ├── api/products/     # API для товаров
│   │   ├── products/         # Страница каталога
│   │   └── page.tsx          # Главная страница
│   ├── constants/            # Константы (товары, цвета)
│   ├── hooks/                # React хуки (корзина)
│   ├── lib/                  # Утилиты (Prisma)
│   └── types/                # TypeScript типы
├── prisma/                   # Схема базы данных
└── scripts/                  # Скрипты (seed)
```

## 🛠 Технологии

- **Next.js 15.5.1** - React фреймворк
- **PostgreSQL** - база данных
- **Prisma** - ORM
- **Tailwind CSS** - стили
- **TypeScript** - типизация

## 📊 База данных

- **Товары** - 10 позиций хачапури
- **Пользователи** - система заказов
- **Заказы** - обработка заказов
- **Платежи** - Idram, ArCa, Ameriabank

## 🌐 Деплой

Проект готов для деплоя на Vercel с PostgreSQL.
