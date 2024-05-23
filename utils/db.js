#!/usr/bin/node

const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const HOST = process.env.DB_HOST || 'localhost';
    const PORT = process.env.DB_PORT || '27017';
    const DATABASE = process.env.DB_DATABASE || 'files_manager';

    this.connected = false;
    const uri = `mongodb://${HOST}:${PORT}/${DATABASE}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.client.connect()
      .then(() => {
        this.connected = true;
        this.db = this.client.db();
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
        console.log('Connected to MongoDB');
      })
      .catch(error => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with a non-zero exit code to indicate failure
      });
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    try {
      return await this.users.countDocuments();
    } catch (error) {
      console.error('Error getting number of users:', error);
      return 0;
    }
  }

  async nbFiles() {
    try {
      return await this.files.countDocuments();
    } catch (error) {
      console.error('Error getting number of files:', error);
      return 0;
    }
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
