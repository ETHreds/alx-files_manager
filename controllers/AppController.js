#!/usr/bin/node

const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');


async function getStatus(req, res) {
    try {
        const redisStatus = await redisClient.isAlive();
        const dbStatus = await dbClient.isAlive();

        res.status(200).json({ redis: redisStatus, db: dbStatus });
    } catch (error) {
        console.error('Error getting status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getStats(req, res) {
    try {
        const usersCount = await dbClient.nbUsers();
        const filesCount = await dbClient.nbFiles();

        res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getStatus,
    getStats
};
