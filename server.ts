import * as dotenv from 'dotenv';
import express from 'express';
import { Log } from './src/utils/logger';
import ticketRoutes from './src/routes/ticket-routes';
import Database from './src/database/database';
import ServerManager from './src/server-manager';
import { requireEnv, requireIntEnv } from './src/utils/env';

class Server {
  private app: express.Application;
  private port: number;
  private uri: string;
  private database: Database;
  private serverManager: ServerManager;

  constructor() {
    dotenv.config();
    this.app = express();
    this.port = requireEnv('NODE_ENV') === 'PROD' ? requireIntEnv('PROD_PORT') : requireIntEnv('DEV_PORT');
    this.uri = requireEnv('NODE_ENV') === 'PROD' ? requireEnv('PROD_MONGODB_URI') : requireEnv('DEV_MONGODB_URI');

    this.database = new Database();
    this.serverManager = new ServerManager(1000); // Adjust the maximum limit as per your requirements

    this.setupMiddleware();
    this.setupRoutes();
    this.connectToDatabase();
  }

  /**
   * Set up the middleware for the Express application.
   * This includes handling JSON parsing for incoming requests.
   */
  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  /**
   * Set up the routes for the Express application.
   * Register the Server Manager middleware to handle concurrency.
   * Register the ticket routes under the '/api/v1' path.
   */
  private setupRoutes(): void {
    this.app.use((req, res, next) => {
      this.serverManager.handleRequest(req, res, next);
    });
    this.app.use('/api/v1', ticketRoutes);
  }

  /**
   * Connect to the MongoDB database using the specified URI.
   */
  private connectToDatabase(): void {
    this.database.connect(this.uri);
  }

  /**
   * Start the server and listen on the specified port.
   * Once the server is running, log the server URL.
   */
  public start(): void {
    this.app.listen(this.port, () => {
      Log.info(`Server running @ http://localhost:${this.port}`);
    });
  }
}

// Create an instance of the Server class and start the server.
export const server = new Server();
server.start();
