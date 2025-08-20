require('./test-setup');

const app = require('../app');
const { expect } = require('chai');

describe('Health Check API', () => {
  let server;

  before(async () => {
    // Khởi tạo server test trên port 3001
    server = app.listen(3001);
    
    // Đợi server khởi động
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Health test server started on port 3001');
  });

  after(async () => {
    if (server) {
      await new Promise(resolve => server.close(resolve));
      console.log('Health test server closed');
    }
  });

  describe('GET /health', () => {
    it('should return server status successfully', (done) => {
      chai.request(server)
        .get('/health')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message', 'Server is running');
          expect(res.body).to.have.property('timestamp');
          
          done();
        });
    });

    it('should return correct response structure', (done) => {
      chai.request(server)
        .get('/health')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('timestamp');
          expect(res.body.success).to.be.a('boolean');
          expect(res.body.message).to.be.a('string');
          expect(res.body.timestamp).to.be.a('string');
          
          // Kiểm tra timestamp format
          const timestamp = new Date(res.body.timestamp);
          expect(timestamp.getTime()).to.not.be.NaN;
          
          done();
        });
    });

    it('should handle multiple concurrent requests', (done) => {
      const requests = [];
      for (let i = 0; i < 3; i++) {
        requests.push(
          chai.request(server)
            .get('/health')
            .then(res => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('success', true);
              return res;
            })
        );
      }

      Promise.all(requests)
        .then(() => done())
        .catch(done);
    });
  });
});
