import React, { Component } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppButton from './components/AppButton';
import TicketList from './components/TicketList';
import CustomIcon from './components/CustomIcon'; // Import the CustomIcon component
import './styles/App.css';

class App extends Component {
  state = {
    refreshTicketList: false
  };

  // Callback function to handle ticket creation
  handleTicketCreated = () => {
    this.setState({ refreshTicketList: true });
  };

  // Callback function to handle ticket list refresh
  handleTicketListRefreshed = () => {
    this.setState({ refreshTicketList: false });
  };

  render() {
    const { refreshTicketList } = this.state;

    return (
      <Container maxWidth="lg" className="container">
        <CustomIcon color="#569DFD" /> {/* Add the CustomIcon component */}
        <TicketList
          refresh={refreshTicketList}
          onRefreshed={this.handleTicketListRefreshed}
        />
        <Box className="buttonContainer">
          <AppButton onTicketCreated={this.handleTicketCreated} />
        </Box>
      </Container>
    );
  }
}

export default App;
