const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const { UserRepository } = require('../repositories');

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registration result with user and token
   */
  async register(userData) {
    const { name, age, email, password } = userData;

    // Check if email already exists
    const emailExists = await this.userRepository.emailExists(email);
    if (emailExists) {
      throw new Error('Email already exists');
    }

    // Create new user
    const user = await this.userRepository.create({
      name,
      age,
      email,
      password
    });

    // Generate JWT token
    const token = this.generateToken(user);

    return {
      user: this.formatUserResponse(user),
      token
    };
  }

  /**
   * Authenticate user login
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Login result with user and token
   */
  async login(email, password) {
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = this.generateToken(user);

    return {
      user: this.formatUserResponse(user),
      token
    };
  }

  /**
   * Get user profile by ID
   * @param {number} userId - User ID
   * @returns {Promise<Object>} User profile
   */
  async getProfile(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return this.formatUserResponse(user);
  }

  /**
   * Generate JWT token for user
   * @param {Object} user - User object
   * @returns {string} JWT token
   */
  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );
  }

  /**
   * Format user response (exclude sensitive data)
   * @param {Object} user - User object
   * @returns {Object} Formatted user object
   */
  formatUserResponse(user) {
    return {
      id: user.id,
      name: user.name,
      age: user.age,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  /**
   * Verify JWT token
   * @param {string} token - JWT token
   * @returns {Object} Decoded token payload
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, jwtConfig.secret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

module.exports = AuthService;
