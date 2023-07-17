import mongoose, { Document, Schema, Model } from 'mongoose';
import { generateRandomDeadline, generateRandomNumber, generateRandomValue } from '../utils/utils';

// Enum for random client names
enum RandomClients {
  CLIENT1 = 'CONDOR',
  CLIENT2 = 'MIAT',
  CLIENT3 = 'SAS',
}

// Enum for random issue messages
enum RandomIssues {
  ISSUE1 = 'Message 1',
  ISSUE2 = 'Message 2',
  ISSUE3 = 'Message 3',
}

interface ITicket extends Document {
  ticket: string;
  client: string;
  issue: string;
  status: string;
  deadline: Date;
  date: Date;
}

class TicketModel {
  private model: Model<ITicket>;

  constructor() {
    // Check if the model is already defined
    if (!mongoose.models.Ticket) {
      // Define the schema for the Ticket model
      const ticketsSchema: Schema<ITicket> = new mongoose.Schema(
        {
          ticket: { type: String, unique: true, immutable: true },
          client: { type: String, immutable: true },
          issue: { type: String },
          status: { type: String, required: true, default: 'open' },
          deadline: { type: Date, required: true, default: Date.now },
          date: { type: Date, required: true, immutable: true, default: Date.now },
        },
        { collection: 'tickets' }
      );

      // Define a pre-save middleware to generate random values for new tickets
      ticketsSchema.pre('save', async function (this: ITicket, next) {
        try {
          if (!this.isNew) {
            return next();
          }

          this.deadline = generateRandomDeadline();
          this.ticket = `IF${generateRandomNumber(10)}`;
          this.client = this.client || generateRandomValue(RandomClients);
          this.issue = this.issue || generateRandomValue(RandomIssues);

          next();
        } catch (error) {
          next(error);
        }
      });

      // Create the Ticket model using the schema
      this.model = mongoose.model<ITicket>('Ticket', ticketsSchema);
    } else {
      // Use the existing Ticket model if it's already defined
      this.model = mongoose.models.Ticket;
    }
  }

  /**
   * Retrieve all tickets from the database.
   */
  public getAllTickets = async (): Promise<ITicket[]> => {
    try {
      return this.model.find().select({ _id: 0, __v: 0 }).sort({ deadline: -1 });
    } catch (error) {
      throw new Error('Failed to retrieve all tickets.');
    }
  };

  /**
   * Insert a new ticket into the database.
   * @param client - The client name for the ticket.
   * @param issue - The issue message for the ticket.
   */
  public insertTicket = async (client?: string, issue?: string): Promise<ITicket> => {
    try {
      const ticketInstance = new this.model({ client, issue });
      return ticketInstance.save();
    } catch (error) {
      throw new Error('Failed to insert ticket.');
    }
  };

  /**
   * Update a ticket in the database.
   * @param ticket - The ticket number.
   * @param issue - The updated issue message.
   * @param status - The updated status of the ticket.
   */
  public updateTicket = async (ticket: string, issue: string, status: string): Promise<ITicket | null> => {
    try {
      return this.model.findOneAndUpdate({ ticket }, { issue, status }, { new: true });
    } catch (error) {
      throw new Error('Failed to update ticket.');
    }
  };
}

export default new TicketModel();
