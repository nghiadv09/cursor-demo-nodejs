const BaseRepository = require('./BaseRepository');
const User = require('../models/User');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User object or null
   */
  async findByEmail(email) {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  /**
   * Find user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} User object or null
   */
  async findById(id) {
    try {
      return await User.findByPk(id);
    } catch (error) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }

  /**
   * Create new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user object
   */
  async create(userData) {
    try {
      return await User.create(userData);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  /**
   * Update user
   * @param {number} id - User ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated user object
   */
  async update(id, updateData) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      return await user.update(updateData);
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  /**
   * Delete user
   * @param {number} id - User ID
   * @returns {Promise<boolean>} Success status
   */
  async delete(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
      return true;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  /**
   * Check if email exists
   * @param {string} email - Email to check
   * @returns {Promise<boolean>} True if email exists
   */
  async emailExists(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return !!user;
    } catch (error) {
      throw new Error(`Error checking email existence: ${error.message}`);
    }
  }

  /**
   * Get all users with pagination
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Users and pagination info
   */
  async findAllWithPagination(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await User.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ['password'] }
      });

      return {
        users: rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: limit
        }
      };
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }
}

module.exports = UserRepository;
