```
# Ticket System API Backend

A ticket management system API built with Node.js, Express, and MongoDB.

## Description

This project provides a backend API for a ticket management system. It allows users to create new tickets, update existing tickets, and retrieve a list of all tickets. The API is built using Node.js and Express framework, and data is stored in a MongoDB database.

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ticket-system-api-backend.git
   ```

2. Navigate to the project directory:

```bash
cd ticket-system-api
```

3. Install the backend dependencies:

```bash
npm install
```

   to install frontend dependencies:

```bash
cd frontend
npm install
```

4. Set up the environment variables:

   - Create a `.env` file in the project root directory.
   - Add the following variables to the `.env` file and provide appropriate values:

     ```
     NODE_ENV=DEV
     DEV_PORT=8000
     DEV_MONGODB_URI=mongodb://localhost:27017/PROD_SUPPORT
     ```

     Note: Adjust the values according to your development environment.

5. Start the backend server:

```bash
npm run dev
```

   To start both the backend and frontend servers

```bash
npm run boot
```

6. The server should now be running at http://localhost:8000.

## API Endpoints

- **GET /api/v1/tickets**: Get all tickets.
`/tickets`: Retrieve a list of all tickets sorted by deadline desc.
- **POST /api/v1/tickets**: Create a new ticket.
`/tickets`: Create a new ticket.
- **PUT /api/v1/tickets/:id**: Update a ticket.
`/tickets/{id}`: Update the ticket.

## MongoDB Collection

Each ticket should have the following properties: `client`, `issue`, `status('open', 'closed')` and `deadline`.

## Testing

For comprehensive debugging and analysis logs.log and error.log file are created.

To run the tests, use the following command:

```bash
npm run test
```

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests to contribute to this project.

## Authors

- Ashish Vashisht - [GitHub](https://github.com/concurdev)

## Acknowledgments

- This project is for educational purposes only.
```