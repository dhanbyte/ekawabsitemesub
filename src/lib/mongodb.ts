import { MongoClient, Db, MongoClientOptions } from 'mongodb'

// Skip MongoDB connection during build time
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                   process.env.npm_lifecycle_event === 'build' ||
                   process.env.NODE_ENV === 'production';

// Get MongoDB URI from environment variables
const uri = process.env.MONGODB_URIS || '';
const dbName = process.env.MONGODB_DB_NAME || 'shopwave';

// Skip MongoDB connection if we're in build time or URI is not set
const shouldConnect = !isBuildTime && uri;

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

// Mock database for build time
const mockDb = {
  collection: () => ({
    find: () => ({ toArray: () => Promise.resolve([]) }),
    findOne: () => Promise.resolve(null),
    insertOne: () => Promise.resolve({ insertedId: 'mock' }),
    updateOne: () => Promise.resolve({ matchedCount: 0 }),
    deleteOne: () => Promise.resolve({ deletedCount: 0 }),
    createIndex: () => Promise.resolve('mock_index'),
    countDocuments: () => Promise.resolve(0),
    aggregate: () => ({ toArray: () => Promise.resolve([]) })
  })
} as unknown as Db;

if (shouldConnect) {
  const options: MongoClientOptions = {
    retryWrites: true,
    w: 'majority',
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 15000,
    socketTimeoutMS: 15000,
    maxPoolSize: 10,
    minPoolSize: 5,
  };
  
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the connection across module reloads
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, create a new connection
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export async function getDatabase(): Promise<Db> {
  // Return mock database during build time or if connection is not established
  if (isBuildTime || !clientPromise) {
    return mockDb;
  }
  
  try {
    const client = await clientPromise;
    return client.db(dbName);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Return mock database in case of connection errors
    return mockDb;
  }
}

export default clientPromise;