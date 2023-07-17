```
# Frontend for the Ticket System

Frontend is designed in React using TypeScript, used MaterialUI for icons, list and buttons.

## Description

This project provide UI for the  ticket management system. It allows users to create new tickets, update existing tickets, and retrieve a list of all tickets.

**Requirements:**

1. Frontend:

   **Check the UI images at the end of the requirements.** It was used as the reference. ![1688398030985](image/README/1688398030985.png)

3. General Requirements:

   - [ ] Use appropriate error handling and validation techniques throughout the application.
   - [ ] Write clean and maintainable code, following SOLID principles and design patterns.
   - [ ] Provide clear instructions on how to set up and run the application.

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/ticket-system-api.git
```

2. Navigate to the project directory:

```bash
cd ticket-system-api/frontend
```

3. Install the dependencies:

```bash
npm install or npm i -legacy-peer
```

npm i -legacy-peer because MaterialUI is not updated from a while.

4. Start the server:

```bash
npm start
```

6. The server should now be running at http://localhost:3000.

## UI Functionality

   - [ ] The frontend displays list of tickets, including their client name, issue message, deadline and status.
   - [ ] The ticket status are resembled by an icon with variants in 3 colors depending on the following cases:

        - [ ] Green: status = closed
        - [ ] Yellow: status = open AND today < deadline
        - [ ] Red: status = open AND today > deadline

   - [ ] Users is be able to change tickets status using a slider button
   - [ ] Using "Create Randomly" button user can generate a random ticket with dates between now - 2 days and now + 2 days, random client name, random issue message and save it using the REST API everytime it's clicked

   - [ ] Additional functionality added for "Create New" button, it opens a modal and user can type the Client and issue and create a new ticket.

    - [ ] Debounce feature is added to avoid concurrent generation of tickets.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests to contribute to this project.

## Authors

- Ashish Vashisht - [GitHub](https://github.com/concurdev)

## Acknowledgments

- This project is for educational purposes only.
```
