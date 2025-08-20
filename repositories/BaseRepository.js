class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  /**
   * Find all records
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of records
   */
  async findAll(options = {}) {
    try {
      return await this.model.findAll(options);
    } catch (error) {
      throw new Error(`Error fetching records: ${error.message}`);
    }
  }

  /**
   * Find record by primary key
   * @param {number|string} id - Primary key value
   * @param {Object} options - Query options
   * @returns {Promise<Object|null>} Record or null
   */
  async findById(id, options = {}) {
    try {
      return await this.model.findByPk(id, options);
    } catch (error) {
      throw new Error(`Error finding record by ID: ${error.message}`);
    }
  }

  /**
   * Find one record with conditions
   * @param {Object} conditions - Where conditions
   * @param {Object} options - Query options
   * @returns {Promise<Object|null>} Record or null
   */
  async findOne(conditions, options = {}) {
    try {
      return await this.model.findOne({ where: conditions, ...options });
    } catch (error) {
      throw new Error(`Error finding record: ${error.message}`);
    }
  }

  /**
   * Create new record
   * @param {Object} data - Record data
   * @returns {Promise<Object>} Created record
   */
  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error(`Error creating record: ${error.message}`);
    }
  }

  /**
   * Update record
   * @param {number|string} id - Primary key value
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated record
   */
  async update(id, data) {
    try {
      const record = await this.model.findByPk(id);
      if (!record) {
        throw new Error('Record not found');
      }
      return await record.update(data);
    } catch (error) {
      throw new Error(`Error updating record: ${error.message}`);
    }
  }

  /**
   * Delete record
   * @param {number|string} id - Primary key value
   * @returns {Promise<boolean>} Success status
   */
  async delete(id) {
    try {
      const record = await this.model.findByPk(id);
      if (!record) {
        throw new Error('Record not found');
      }
      await record.destroy();
      return true;
    } catch (error) {
      throw new Error(`Error deleting record: ${error.message}`);
    }
  }

  /**
   * Count records with conditions
   * @param {Object} conditions - Where conditions
   * @returns {Promise<number>} Count of records
   */
  async count(conditions = {}) {
    try {
      return await this.model.count({ where: conditions });
    } catch (error) {
      throw new Error(`Error counting records: ${error.message}`);
    }
  }

  /**
   * Find and count records with pagination
   * @param {Object} options - Query options
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Records and pagination info
   */
  async findAndCountAll(options = {}, page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      const result = await this.model.findAndCountAll({
        ...options,
        limit,
        offset
      });

      return {
        data: result.rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(result.count / limit),
          totalItems: result.count,
          itemsPerPage: limit
        }
      };
    } catch (error) {
      throw new Error(`Error finding and counting records: ${error.message}`);
    }
  }
}

module.exports = BaseRepository;
