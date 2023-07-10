
import { MongoClient } from 'mongodb'

// Connection URL
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/`;
const client = new MongoClient(url);
const connection = async (collectionName)  =>{
  await client.connect();
  console.log('Connected successfully to server');
// Database Name
  const dbName = process.env.MONGO_DB;
  const collection = client.db(dbName).collection(collectionName);
  return{
    add: async (document) => await collection.insertOne(document),
    get: async (filters) => await collection.find(filters??{}, {projection:{ _id: 0 }}).toArray(),
    update: async (target, document) => await collection.updateOne(target, { $set: document }),
    remove: async (target) => await collection.deleteMany(target)
  }
}

export default connection