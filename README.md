# 📦 WB Analytics

Простой сервис аналитики товаров с Wildberries. Позволяет парсить данные, фильтровать их по параметрам и отображать результаты в виде таблицы и диаграмм.

---

## 🚀 Возможности

- 📊 Парсинг товаров с Wildberries
- 💾 Сохранение данных в SQLite
- 🔍 Фильтрация по цене, рейтингу, отзывам
- 🧮 Таблица с сортировкой и обновлением
- 📈 Гистограмма и линейный график
- 🖥️ UI на React + Tailwind CSS
- ⚡ Backend на FastAPI

---

## 📁 Структура проекта

```
wb_analytics/
│
├── backend/
│   ├── main.py           # Запуск FastAPI
│   ├── parser.py         # Парсер Wildberries
│   ├── db.py, models.py  # База и модели
│   ├── requirements.txt  # Зависимости Python
│
├── frontend/
│   ├── src/              # Исходники React
│   ├── package.json      # Зависимости Node.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│
├── .gitignore
├── README.md
```

---

## ⚙️ Установка

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # для Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔄 Парсинг товаров

Открой файл `parser.py` и передай в функцию нужный поисковый запрос:

```python
parse_wb("ноутбуки")
```

---

## 🔌 Пример API-запроса

```http
GET /api/products/?min_price=5000&max_price=15000&min_rating=4.2&min_reviews=100
```

---

## 📊 Визуализация

В интерфейсе доступна:

- Гистограмма распределения цен
- График "скидка vs рейтинг"
- Таблица товаров с фильтрами и сортировкой

---

## 🧠 Технологии

- Python 3.11+
- FastAPI
- SQLite
- React (Vite)
- Tailwind CSS
- Chart.js / Recharts

---

## 👨‍💻 Автор

Разработано как тестовое задание.  
По вопросам и предложениям: [tg: @diwiz1ya](https://t.me/diwiz1ya)