const { AuthService } = require('../services');

// Initialize service
const authService = new AuthService();

// Đăng ký
const register = async (req, res) => {
  try {
    const { name, age, email, password } = req.body;

    // Sử dụng service để đăng ký user
    const result = await authService.register({ name, age, email, password });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result
    });

  } catch (error) {
    console.error('Register error:', error);
    
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validationErrors
      });
    }

    // Handle business logic errors
    if (error.message === 'Email already exists') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Đăng nhập
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra email và password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Sử dụng service để đăng nhập
    const result = await authService.login(email, password);

    res.json({
      success: true,
      message: 'Login successful',
      data: result
    });

  } catch (error) {
    console.error('Login error:', error);
    
    // Handle business logic errors
    if (error.message === 'Invalid email or password') {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Lấy thông tin user hiện tại
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Sử dụng service để lấy profile
    const userProfile = await authService.getProfile(userId);

    res.json({
      success: true,
      data: userProfile
    });

  } catch (error) {
    console.error('Get profile error:', error);
    
    // Handle business logic errors
    if (error.message === 'User not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  register,
  login,
  getProfile
};
