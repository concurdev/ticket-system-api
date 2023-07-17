import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import '../styles/ModalComponent.css'; // Import the CSS file

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  onTicketCreated: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  open,
  onClose,
  onTicketCreated
}) => {
  const [client, setClient] = useState('');
  const [issue, setIssue] = useState('');

  const handleCreateNew = () => {
    const payload = {
      client: client,
      issue: issue,
    };

    axios
      .post('/api/v1/tickets', payload)
      .then((response) => {
        console.log(response.data);
        // Reset the text fields
        setClient('');
        setIssue('');

        // Close the modal
        onClose();

        // Call the callback function to refresh/mount TicketList
        onTicketCreated();
      })
      .catch((error) => {
        console.log('Error creating ticket:', error);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modalContainer">
        <div className="modalHeader">
          <Typography variant="h6" component="div" className="modalTitle">
            New Ticket
          </Typography>
          <CloseIcon onClick={onClose} className="closeIcon" />
        </div>
        <TextField
          label="Client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          fullWidth
          className="textField"
        />
        <TextField
          label="Issue"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          fullWidth
          className="textField"
        />
        <Button
          variant="contained"
          endIcon={<ChevronRightIcon />}
          onClick={handleCreateNew}
          className="createButton"
        >
          Create New
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
