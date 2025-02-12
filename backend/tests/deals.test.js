const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Deal = require('../models/Deal');
const dealsRoutes = require('../routes/deals');

const app = express();
app.use(express.json());
app.use('/api/deals', dealsRoutes);

describe('Deals Routes', () => {
  beforeAll(async () => {
    const mongoUri = 'mongodb://localhost:27017/testdb';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe('GET /api/deals/fetch', () => {
    it('should fetch and store game deals', async () => {
      const res = await request(app).get('/api/deals/fetch');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('msg', 'Deals fetched and stored successfully');
    });
  });

  describe('GET /api/deals', () => {
    it('should get all game deals', async () => {
      const res = await request(app).get('/api/deals');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });
});
