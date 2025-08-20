module.exports = {
  require: ['test/test-setup.js'],
  timeout: 10000,
  exit: true,
  recursive: false, // Tắt recursive
  colors: true,
  reporter: 'spec'
  // Bỏ spec để chỉ chạy file được chỉ định
};
