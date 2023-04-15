const { MongoClient } = require('mongodb');

class Database {
  constructor(url, options) {
    this.url = url;
    this.options = options;
    this.pool = null;
  }

  async connect() {
    if (!this.pool) {
      this.pool = await MongoClient.connect(this.url, this.options);
    }
  }

  getConnection() {
    if (!this.pool) {
      throw new Error('Connection pool is not initialized');
    }
    return this.pool.acquire();
  }

  async queryInDb(callback) {
    const connection = await this.getConnection();
    try {
      const result = await callback(connection.db());
      return result;
    } finally {
      connection.release();
    }
  }
}

module.exports = Database;


// pseudo code
const db = new Database(url, options);
await db.connect();

await db.queryInDb(async (db) => {
  const collection = db.collection('myCollection');
  const result = await collection.find({}).toArray();
  console.log(result);
});
// also we can use versionKey as an option of model