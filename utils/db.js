#!/usr/bin/node

const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const HOST = process.env.DB_HOST || 'localhost'
    const PORT = process.env.DB_PORT || 27017
    const DATABASE = process.env.DB_DATABASE || 'files_manager'

    this.connected = false
    const uri = `mongodb://${HOST}:${PORT}/${DATABASE}`
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.connected = true;
      this.db = this.client.db();
      this.users = this.db.collection('users');
      this.files = this.db.collection('files');
    }).catch(console.error(error));

  }

  isAlive() {
    return this.connected;
  }
  async nbUsers() {
    return await this.users.countDocuments();
  }

  async nbFiles() {
    return await this.files.countDocuments();
  }
}
