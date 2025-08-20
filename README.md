# Demo Node.js Express API

Dự án Node.js Express với Sequelize và JWT authentication.

## Tính năng

- Đăng ký user mới
- Đăng nhập user
- Xác thực JWT
- Lấy thông tin profile
- Database MySQL với Sequelize
- Mã hóa password với bcrypt
- Migration và Seeding database

## Cài đặt

1. Clone repository
2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` với nội dung:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=demo_nodejs
DB_PORT=3306

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h

PORT=3000
```

4. Tạo database MySQL tên `demo_nodejs`

5. Chạy migration để tạo bảng:
```bash
npm run db:migrate
```

6. (Tùy chọn) Chạy seeder để tạo dữ liệu mẫu:
```bash
npm run db:seed
```

7. Chạy ứng dụng:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Database Commands

```bash
# Tạo bảng từ migration
npm run db:migrate

# Hoàn tác migration cuối cùng
npm run db:migrate:undo

# Chạy tất cả seeders
npm run db:seed

# Hoàn tác tất cả seeders
npm run db:seed:undo

# Reset hoàn toàn database (drop, create, migrate, seed)
npm run db:reset
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Đăng ký user mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/profile` - Lấy thông tin profile (yêu cầu JWT)

### Health Check

- `GET /health` - Kiểm tra trạng thái server

## Cấu trúc dự án

```
demo-nodejs/
├── config/
│   ├── database.js      # Cấu hình Sequelize
│   └── jwt.js          # Cấu hình JWT
├── controllers/
│   └── authController.js # Logic xử lý auth
├── database/
│   ├── config/
│   │   └── config.json  # Cấu hình Sequelize CLI
│   ├── migrations/
│   │   └── 20241201000000-create-users-table.js
│   └── seeders/
│       └── 20241201000000-demo-users.js
├── middleware/
│   └── auth.js         # Middleware xác thực JWT
├── models/
│   └── User.js         # Model User với Sequelize
├── routes/
│   └── auth.js         # Routes cho authentication
├── .sequelizerc        # Cấu hình Sequelize CLI
├── app.js              # File chính của ứng dụng
├── package.json        # Dependencies
└── README.md           # Hướng dẫn này
```

## Database Schema

### Bảng Users

| Field     | Type         | Constraints           |
|-----------|--------------|----------------------|
| id        | INT          | PRIMARY KEY, AUTO_INCREMENT |
| name      | VARCHAR(100) | NOT NULL, length 2-100 |
| age       | INT          | NOT NULL, range 1-120 |
| email     | VARCHAR(255) | NOT NULL, UNIQUE, EMAIL |
| password  | VARCHAR(255) | NOT NULL, length 6-255 |
| createdAt | TIMESTAMP    | AUTO |
| updatedAt | TIMESTAMP    | AUTO |

## Sử dụng API

### Đăng ký

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 25,
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Đăng nhập

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Lấy Profile (với JWT)

```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Dependencies

- **express**: Web framework
- **sequelize**: ORM cho database
- **mysql2**: MySQL driver
- **bcryptjs**: Mã hóa password
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **nodemon**: Auto-restart development server
- **sequelize-cli**: CLI tool cho Sequelize
