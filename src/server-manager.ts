import { Request, Response, NextFunction } from 'express';
import { Log } from './utils/logger';
import { Semaphore } from 'async-mutex';

class ServerManager {
  private concurrentRequests: number;
  private maxConcurrentRequests: number;
  private isServiceDenied: boolean;
  private lock: Semaphore;

  constructor(maxConcurrentRequests: number) {
    this.concurrentRequests = 0;
    this.maxConcurrentRequests = maxConcurrentRequests;
    this.isServiceDenied = false;
    this.lock = new Semaphore(this.maxConcurrentRequests);
  }

  /**
   * Handle the incoming request and enforce concurrency control.
   *
   * @param req - The incoming request object.
   * @param res - The outgoing response object.
   * @param next - The next middleware function.
   */
  public async handleRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (this.isServiceDenied) {
      Log.error('C O N C U R R E N C Y: Service denied. Server is overloaded.');
      res.status(503).json({ error: 'Service denied. Server is overloaded.' });
      return;
    }

    try {
      await this.lock.acquire();

      this.logConcurrencyLevel();
      this.concurrentRequests++;

      if (this.concurrentRequests > this.maxConcurrentRequests) {
        this.isServiceDenied = true;
        Log.error('C O N C U R R E N C Y: Server is overloaded. Service denied for this request');
        res.status(503).json({ error: 'Service denied. Server is overloaded' });
        return;
      }

      next();
    } finally {
      this.concurrentRequests--;
      this.lock.release();
    }
  }

  /**
   * Log the current concurrency level.
   */
  private logConcurrencyLevel(): void {
    if (this.concurrentRequests > 10) {
      Log.error('C O N C U R R E N C Y: Server is overloaded. Service denied for this request');
    } else if (this.concurrentRequests > 5) {
      Log.warn('C O N C U R R E N C Y: High! Consider optimizing server performance');
    } else if (this.concurrentRequests > 2) {
      Log.info('C O N C U R R E N C Y: Moderate');
    }
  }
}

export default ServerManager;
