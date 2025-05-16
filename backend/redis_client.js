// redis_client.js
const { createClient } = require('redis');

const redisConfig = {
  development: 'redis://localhost:6379',
  production: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:6379`,
};

const env = process.env.NODE_ENV || 'development';

let client;

const getRedisClient = async () => {
  if (!client) {
    client = createClient({
      url: redisConfig[env],
    });

    client.on('error', (err) => console.error('Redis Client Error:', err));
    client.on('connect', () => console.log('✅ Connected to Redis'));

    try {
      await client.connect();
    } catch (err) {
      console.error('❌ Failed to connect to Redis:', err);
      throw err;
    }
  }

  return client;
};

module.exports = getRedisClient;