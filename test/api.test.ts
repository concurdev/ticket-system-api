import axios from 'axios';

const baseURL = 'http://localhost:8000/api/v1'; // Replace with your server's URL
const api = axios.create({ baseURL });

  it('should create a new ticket', async () => {
    const response = await api.post('/tickets', {});
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('ticket');
    expect(response.data).toHaveProperty('client');
    expect(response.data).toHaveProperty('issue');
    // Add a delay before making the second request
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });

  it('should create a new ticket with specific client and issue', async () => {
    const response = await api.post('/tickets', {
      client: 'Client 1',
      issue: 'Issue 1',
    });
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('ticket');
    expect(response.data.client).toBe('Client 1');
    expect(response.data.issue).toBe('Issue 1');
  });

  it('should get all tickets', async () => {
    const response = await api.get('/tickets');
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(response.data.data.tickets).toBeInstanceOf(Array);
  });

  it('should update a ticket', async () => {
    const ticketsResponse = await api.get('/tickets');
    const tickets = ticketsResponse.data.data.tickets;
    expect(tickets).toBeInstanceOf(Array);
    expect(tickets.length).toBeGreaterThan(0);

    const randomTicket = tickets[Math.floor(Math.random() * tickets.length)];

    const response = await api.put(`/tickets/${randomTicket.ticket}`, {
      issue: 'Updated Issue',
      status: 'closed',
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('ticket');
    expect(response.data.issue).toBe('Updated Issue');
    expect(response.data.status).toBe('closed');
  });

  it('should return 404 when updating a non-existent ticket', async () => {
    try {
      const response = await api.put('/tickets/1234', {
        issue: 'Updated Issue',
        status: 'closed',
      });
  
      expect(response.status).toBe(404);
      expect(response.data).toHaveProperty('message');
      expect(response.data.message).toBe('Ticket not found');
    } catch (error) {
      // If the request fails with a 404 error, consider it as a pass
      if (error.response && error.response.status === 404) {
        return;
      }
  
      throw error; // Re-throw any other error that occurred
    }
  });
