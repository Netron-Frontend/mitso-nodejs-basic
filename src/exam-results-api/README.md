# Exam Results Management API

REST API для учета результатов сдачи вступительных экзаменов.

## Сущности и связи

### Abiturient (Абитуриент)
- **Свойства**: id, firstName, lastName, birthDate, phone, email, address
- **Связи**: может иметь множество экзаменов (One-to-Many с Exam)

### Teacher (Преподаватель)
- **Свойства**: id, firstName, lastName, specialization, department, email, phone
- **Связи**: может принимать множество экзаменов (One-to-Many с Exam)

### Exam (Экзамен)
- **Свойства**: id, subject, score, date, abiturientId, teacherId
- **Связи**: принадлежит одному абитуриенту и одному преподавателю (Many-to-One с Abiturient и Teacher)

## Архитектура

Проект построен на многослойной архитектуре:

1. **Model Layer** (`*.model.js`) - модели сущностей и бизнес-логика
2. **Repository Layer** (`*.memory.repository.js`) - работа с хранилищем данных (in-memory array)
3. **Service Layer** (`*.service.js`) - бизнес-логика приложения
4. **Controller Layer** (`*.controller.js`) - обработка запросов и формирование ответов
5. **Router Layer** (`*.router.js`) - маршрутизация endpoints
6. **Validator Layer** (`*.validator.js`) - валидация входных данных

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск сервера
npm start

# Запуск в режиме разработки с auto-reload
npm run dev