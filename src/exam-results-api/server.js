const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const abiturientRouter = require('./src/routers/abiturient.router');
const examRouter = require('./src/routers/exam.router');
const teacherRouter = require('./src/routers/teacher.router');

const app = express();
const PORT = 4000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Root endpoint - информация об API
app.get('/', (req, res) => {
    res.status(200).json({
        name: 'Exam Results Management API',
        version: '1.0.0',
        description: 'REST API для учета результатов сдачи вступительных экзаменов',
        endpoints: {
            abiturients: {
                base: '/abiturients',
                methods: {
                    'GET /': 'Получить всех абитуриентов',
                    'GET /:id': 'Получить абитуриента по ID',
                    'GET /:id/exams': 'Получить экзамены абитуриента',
                    'POST /': 'Создать нового абитуриента',
                    'PUT /:id': 'Обновить данные абитуриента',
                    'DELETE /:id': 'Удалить абитуриента'
                }
            },
            exams: {
                base: '/exams',
                methods: {
                    'GET /': 'Получить все экзамены',
                    'GET /:id': 'Получить экзамен по ID',
                    'GET /:id/teachers': 'Получить преподавателей экзамена',
                    'POST /': 'Создать новый экзамен',
                    'PUT /:id': 'Обновить данные экзамена',
                    'DELETE /:id': 'Удалить экзамен'
                }
            },
            teachers: {
                base: '/teachers',
                methods: {
                    'GET /': 'Получить всех преподавателей',
                    'GET /:id': 'Получить преподавателя по ID',
                    'GET /:id/exams': 'Получить экзамены преподавателя',
                    'POST /': 'Создать нового преподавателя',
                    'PUT /:id': 'Обновить данные преподавателя',
                    'DELETE /:id': 'Удалить преподавателя'
                }
            },
            health: {
                url: '/health',
                description: 'Проверка состояния сервера'
            }
        },
        documentation: 'http://localhost:4000/api-docs',
        status: 'Server is running'
    });
});

// API документация (простая версия)
app.get('/api-docs', (req, res) => {
    res.status(200).json({
        info: {
            title: 'Exam Results Management API',
            version: '1.0.0',
            description: 'API для управления результатами вступительных экзаменов'
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Development server'
            }
        ],
        endpoints: {
            abiturients: {
                getAll: {
                    method: 'GET',
                    url: '/abiturients',
                    description: 'Получить всех абитуриентов'
                },
                getById: {
                    method: 'GET',
                    url: '/abiturients/:id',
                    description: 'Получить абитуриента по ID'
                },
                getExams: {
                    method: 'GET',
                    url: '/abiturients/:id/exams',
                    description: 'Получить экзамены абитуриента'
                },
                create: {
                    method: 'POST',
                    url: '/abiturients',
                    description: 'Создать абитуриента',
                    bodyExample: {
                        firstName: 'Иван',
                        lastName: 'Петров',
                        birthDate: '2000-01-15',
                        phone: '+375291234567',
                        email: 'ivan@example.com',
                        address: 'Минск, ул. Ленина 1'
                    }
                },
                update: {
                    method: 'PUT',
                    url: '/abiturients/:id',
                    description: 'Обновить абитуриента'
                },
                delete: {
                    method: 'DELETE',
                    url: '/abiturients/:id',
                    description: 'Удалить абитуриента'
                }
            },
            exams: {
                getAll: {
                    method: 'GET',
                    url: '/exams',
                    description: 'Получить все экзамены'
                },
                getById: {
                    method: 'GET',
                    url: '/exams/:id',
                    description: 'Получить экзамен по ID'
                },
                getTeachers: {
                    method: 'GET',
                    url: '/exams/:id/teachers',
                    description: 'Получить преподавателей экзамена'
                },
                create: {
                    method: 'POST',
                    url: '/exams',
                    description: 'Создать экзамен (abiturientId и teacherId можно передать в body или query)',
                    bodyExample: {
                        subject: 'Математика',
                        score: 85,
                        date: '2024-06-15'
                    },
                    queryExample: '?abiturientId=123&teacherId=456'
                },
                update: {
                    method: 'PUT',
                    url: '/exams/:id',
                    description: 'Обновить экзамен'
                },
                delete: {
                    method: 'DELETE',
                    url: '/exams/:id',
                    description: 'Удалить экзамен'
                }
            },
            teachers: {
                getAll: {
                    method: 'GET',
                    url: '/teachers',
                    description: 'Получить всех преподавателей'
                },
                getById: {
                    method: 'GET',
                    url: '/teachers/:id',
                    description: 'Получить преподавателя по ID'
                },
                getExams: {
                    method: 'GET',
                    url: '/teachers/:id/exams',
                    description: 'Получить экзамены преподавателя'
                },
                create: {
                    method: 'POST',
                    url: '/teachers',
                    description: 'Создать преподавателя',
                    bodyExample: {
                        firstName: 'Мария',
                        lastName: 'Иванова',
                        specialization: 'Математика',
                        department: 'Прикладная математика',
                        email: 'maria@university.by',
                        phone: '+375292345678'
                    }
                },
                update: {
                    method: 'PUT',
                    url: '/teachers/:id',
                    description: 'Обновить преподавателя'
                },
                delete: {
                    method: 'DELETE',
                    url: '/teachers/:id',
                    description: 'Удалить преподавателя'
                }
            }
        }
    });
});

// Routes
app.use('/abiturients', abiturientRouter);
app.use('/exams', examRouter);
app.use('/teachers', teacherRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        message: `The endpoint ${req.method} ${req.url} does not exist`,
        availableEndpoints: {
            documentation: 'GET /api-docs',
            health: 'GET /health',
            abiturients: 'GET /abiturients, POST /abiturients, GET /abiturients/:id, PUT /abiturients/:id, DELETE /abiturients/:id, GET /abiturients/:id/exams',
            exams: 'GET /exams, POST /exams, GET /exams/:id, PUT /exams/:id, DELETE /exams/:id, GET /exams/:id/teachers',
            teachers: 'GET /teachers, POST /teachers, GET /teachers/:id, PUT /teachers/:id, DELETE /teachers/:id, GET /teachers/:id/exams'
        }
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`💚 Health Check: http://localhost:${PORT}/health`);
    console.log(`\n📝 Available endpoints:`);
    console.log(`\n🏫 Abiturients:`);
    console.log(`   GET    /abiturients`);
    console.log(`   POST   /abiturients`);
    console.log(`   GET    /abiturients/:id`);
    console.log(`   PUT    /abiturients/:id`);
    console.log(`   DELETE /abiturients/:id`);
    console.log(`   GET    /abiturients/:id/exams`);
    console.log(`\n📚 Exams:`);
    console.log(`   GET    /exams`);
    console.log(`   POST   /exams`);
    console.log(`   GET    /exams/:id`);
    console.log(`   PUT    /exams/:id`);
    console.log(`   DELETE /exams/:id`);
    console.log(`   GET    /exams/:id/teachers`);
    console.log(`\n👨‍🏫 Teachers:`);
    console.log(`   GET    /teachers`);
    console.log(`   POST   /teachers`);
    console.log(`   GET    /teachers/:id`);
    console.log(`   PUT    /teachers/:id`);
    console.log(`   DELETE /teachers/:id`);
    console.log(`   GET    /teachers/:id/exams`);
});

module.exports = app;