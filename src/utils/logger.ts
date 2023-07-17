import winston from 'winston';
import { requireEnv } from './env';

class Logger {
  private logger: winston.Logger;

  constructor() {
    // Define a custom log format
    const customFormat = winston.format.printf(({ level, message, timestamp }) => {
      return `ticket-system-api | ${requireEnv('NODE_ENV')} run @ ${timestamp} | ${level}: ${message}`;
    });

    // Create separate transports for general logs and error logs
    const generalTransport = new winston.transports.File({ filename: 'logs.log' });
    const errorTransport = new winston.transports.File({ filename: 'error.log', level: 'error' });

    // Create a logger instance with multiple transports and formatting
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        generalTransport,
        errorTransport
      ],
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), // Add a timestamp to each log entry
        customFormat // Use the custom log format defined above
      )
    });
  }

  /**
   * Log an informational message.
   *
   * @param message - The log message to be logged.
   */
  public info(message: string): void {
    this.logger.info(message);
  }

  /**
   * Log a warning message.
   *
   * @param message - The log message to be logged.
   */
  public warn(message: string): void {
    this.logger.warn(message);
  }

  /**
   * Log an error message.
   *
   * @param message - The log message to be logged.
   */
  public error(message: string): void {
    this.logger.error(message);
  }
}

export const Log = new Logger();
