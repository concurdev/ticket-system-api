import React from 'react';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';
import { debounce } from 'lodash';
import '../styles/AppButton.css';

const API_URL = '/api/v1/tickets';

interface AppButtonProps {
  onTicketCreated: () => void;
}

const AppButton: React.FC<AppButtonProps> = ({ onTicketCreated }) => {
  const handleCreateRandomly = debounce(() => {
    axios
      .post(API_URL, {})
      .then((response) => {
        console.log(response.data);
        onTicketCreated(); // Call the callback function to refresh/mount TicketList
      })
      .catch((error) => {
        console.log('Error creating ticket:', error);
      });
  }, 1000); // Debounce delay of 1 second

  const handleCreateNew = debounce(() => {
    const payload = {
      client: 'xyz01',
      issue: 'issue',
    };

    axios
      .post(API_URL, payload)
      .then((response) => {
        console.log(response.data);
        onTicketCreated(); // Call the callback function to refresh/mount TicketList
      })
      .catch((error) => {
        console.log('Error creating ticket:', error);
      });
  }, 1000); // Debounce delay of 1 second

  return (
    <div className="buttonContainer">
      {/* Button to create ticket randomly */}
      <Button
        variant="contained"
        endIcon={<ChevronRightIcon />}
        className="customButton customButtonColor"
        size="small"
        onClick={handleCreateRandomly}
      >
        Create Randomly
      </Button>
      {/* Button to create a new ticket */}
      <Button
        variant="contained"
        endIcon={<ChevronRightIcon />}
        className="customButton customButtonColor"
        size="small"
        onClick={handleCreateNew}
      >
        Create New
      </Button>
    </div>
  );
};

export default AppButton;
