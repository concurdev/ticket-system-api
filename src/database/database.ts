import { connect, connections } from 'mongoose';
import { Log } from '../utils/logger';

const MAX_CONNECTIONS = 400;
const THRESHOLD_PERCENTAGE = 0.85;

class Database {
  private isReplicationInProgress: boolean;

  constructor() {
    this.isReplicationInProgress = false;
  }

  /**
   * Connect to the MongoDB database using the provided URI.
   * @param uri - The MongoDB URI.
   */
  public async connect(uri: string): Promise<void> {
    try {
      await connect(uri);
      Log.info('Connected to MongoDB');

      // Start monitoring the connection pool
      this.monitorConnectionPool();
    } catch (error) {
      Log.error(`MongoDB connection error: ${error}`);
    }
  }

  /**
   * Monitor the connection pool and perform necessary actions based on the current connections.
   */
  private monitorConnectionPool(): void {
    const connectionPool = connections.length;
    const currentPercentage = connectionPool / MAX_CONNECTIONS;

    if (currentPercentage >= THRESHOLD_PERCENTAGE && currentPercentage < 0.9) {
      Log.warn('Number of connections is increasing. Consider scaling or optimizing your MongoDB deployment.');
    } else if (currentPercentage >= 0.9 && !this.isReplicationInProgress) {
      Log.info(`Current connection pool size: ${connectionPool}`);
      this.initiateReplication();
    }

    // Schedule the next monitoring iteration
    setTimeout(() => this.monitorConnectionPool(), 10000);
  }

  /**
   * Initiate the replication process for the MongoDB database.
   * Perform your automatic replication logic here.
   */
  private initiateReplication(): void {
    this.isReplicationInProgress = true;

    // Perform your automatic replication logic here

    this.isReplicationInProgress = false;
  }
}

export default Database;
