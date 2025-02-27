### Для запуска

cd ticket-api
npm install
Создайте файл .env и добавьте
DB_HOST=localhost
DB_USER=
DB_PASS=
DB_NAME=tickets_db
PORT=3000
DATABASE_URL = postgres://NAME:PASSWORD@localhost:5432/tickets_db

Запуск
npm start

Запуск с Nodemon (для разработки)
npm run dev

### Базовый URL

- http://localhost:3000/tickets

---

### Создание тикета

- POST запрос /tickets

{
"topic": "Ошибка на сайте",
"description": "Кнопка не работает"
}

---

### Взять тикет в работу

- PATCH запрос /tickets/:id/in-progress

---

### Завершить тикет

PATCH запрос /tickets/:id/complete

{
"resolution": "Ошибка исправлена"
}

---

### Отменить тикет

- PATCH запрос /tickets/:id/cancel

{
"cancellationReason": "Клиент передумал"
}

---

### Массовая отмена всех тикетов в статусе IN_PROGRESS

PATCH запрос /tickets/cancel-all

---

### Получить список тикетов

- GET запрос /tickets

* Параметры необязательны
  date — Получить тикеты за определенную дату
  startDate и endDate — Получить тикеты за диапазон дат

GET /tickets?startDate=2025-02-01&endDate=2025-02-27

---
