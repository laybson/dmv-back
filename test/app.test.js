const app = require(../index); // ou server… ou app.
const request = require('supertest');

request(app)
  .get('/usuario')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
