#!/usr/bin/node

const { createClient } = require('redis');

class RedisClient {
  constructor(options = {}) {
    this.client = createClient();
    this.client.on('error', (err) => console.log(err));
    this.connected = false;
    this.client.on('connect', () => {
      this.connected = true;
    });
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    try {
      return await this.client.get(key)
    } catch (error) {
      console.error(error);
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, 'EX', duration);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async del(key) {
    try {
      const result = await this.client.del(key);
      return result === 1;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
