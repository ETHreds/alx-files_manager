#!/usr/bin/node

const { createClient } = require('redis');
const { EX } = require('redis');

class RedisClient {
    constructor(options = {}) {
        this.client = createClient();
        this.connected = false;

        this.client.on('error', (error) => {
            console.error('Redis client error:', error);
        });

        this.client.on('connect', () => {
            this.connected = true;
        });
    }

    isAlive() {
        return this.connected;
    }

    async get(key) {
        try {
            const value = await this.client.get(key);
            return value;
        } catch (error) {
            console.error(error);
            return -1;
        }
    }

    async set(key, value, duration) {
        try {
            await this.client.set(key, value, 'EX', duration);
        } catch (error) {
            console.error(error);
        }
    }

    async del(key) {
        try {
            await this.client.del(key);
        } catch (error) {
            console.error(error);
        }
    }
}

const redisClient = new RedisClient();

module.exports = redisClient;
