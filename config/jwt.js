// Only load dotenv if not in test environment
if (process.env.NODE_ENV !== 'test') {
  require('dotenv').config();
}

module.exports = {
  secret: process.env.JWT_SECRET || (process.env.NODE_ENV === 'test' ? 'test-secret-key' : 'your_jwt_secret_key_here'),
  expiresIn: process.env.JWT_EXPIRES_IN || (process.env.NODE_ENV === 'test' ? '1h' : '24h')
};
