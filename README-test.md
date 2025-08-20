# Hướng dẫn chạy Test API

## Yêu cầu

- Node.js (version 14 trở lên)
- MySQL database đã được cấu hình trong file `.env`
- Các dependencies đã được cài đặt: `npm install`

## Cấu hình

1. **Tạo file `.env`** từ `env.example`:
```bash
cp env.example .env
```

2. **Cập nhật thông tin database** trong file `.env`:
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

3. **Đảm bảo database đã được tạo và migrate**:
```bash
npm run db:migrate
npm run db:seed
```

## Chạy Test

### Chạy tất cả test
```bash
npm test
```

### Chạy test với watch mode
```bash
npm run test:watch
```

### Chạy test cụ thể

**Test health check:**
```bash
npm run test:health
```

**Test authentication:**
```bash
npm run test:auth
```

**Test 404 errors:**
```bash
npm run test:404
```

**Test integration:**
```bash
npm run test:integration
```

### Chạy test với coverage
```bash
npm run test:coverage
```

## Cấu trúc Test

```
test/
├── test-setup.js              # Cấu hình chung cho test
├── helpers/
│   └── testHelper.js         # Helper functions cho test
├── health.test.js            # Test health check endpoint
├── 404.test.js              # Test 404 error handler
├── auth/
│   ├── register.test.js      # Test register endpoint
│   ├── login.test.js         # Test login endpoint
│   └── profile.test.js       # Test profile endpoint
└── integration/
    └── auth-flow.test.js     # Test integration flow
```

## Các loại Test

### 1. Unit Tests
- **Health Check**: Kiểm tra endpoint `/health`
- **404 Handler**: Kiểm tra xử lý route không tồn tại

### 2. API Tests
- **Register**: Test đăng ký user với các trường hợp valid/invalid
- **Login**: Test đăng nhập với các trường hợp valid/invalid
- **Profile**: Test lấy thông tin profile với JWT token

### 3. Integration Tests
- **Auth Flow**: Test toàn bộ flow authentication
- **Concurrent Requests**: Test xử lý nhiều request cùng lúc
- **Data Consistency**: Test tính nhất quán dữ liệu

## Lưu ý

1. **Database**: Test sẽ sử dụng database thật từ file `.env`
2. **Port**: Test server chạy trên port 3001 (khác với app chính port 3000)
3. **Timeout**: Mỗi test case có timeout 10 giây
4. **Cleanup**: Test tự động đóng server sau khi hoàn thành

## Troubleshooting

### Lỗi database connection
- Kiểm tra thông tin database trong file `.env`
- Đảm bảo MySQL service đang chạy
- Kiểm tra quyền truy cập database

### Lỗi port đã được sử dụng
- Đảm bảo không có service nào đang chạy trên port 3001
- Hoặc thay đổi port trong `test-setup.js`

### Test chạy chậm
- Kiểm tra kết nối database
- Giảm số lượng concurrent requests trong test nếu cần

## Cập nhật Test

Khi thêm endpoint mới, tạo file test tương ứng trong thư mục `test/` và cập nhật scripts trong `package.json` nếu cần.
