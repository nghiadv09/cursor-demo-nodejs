const chai = require('chai');
const chaiHttp = require('chai-http');

// Cấu hình chai
chai.use(chaiHttp);

// Export các biến global cho test
global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should;
global.chai = chai;
global.chaiHttp = chaiHttp;

// Cấu hình test environment
process.env.NODE_ENV = 'test';

console.log('Test environment configured for health API only');
console.log('NODE_ENV:', process.env.NODE_ENV);
