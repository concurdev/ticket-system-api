import React, { Component, ChangeEvent } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Switch, { SwitchProps } from '@mui/material/Switch';
import AdjustIcon from '@mui/icons-material/Adjust';
import axios from 'axios';
import '../styles/TicketList.css'; // Import the CSS file

interface TicketListProps {
  refresh: boolean;
  onRefreshed: () => void;
}

interface TicketListState {
  checkedList: boolean[];
  tickets: TicketData[] | null;
}

interface TicketData {
  ticket: string;
  client: string;
  issue: string;
  status: string;
  deadline: string;
  date: string;
}

class TicketList extends Component<TicketListProps, TicketListState> {
  constructor(props: TicketListProps) {
    super(props);
    this.state = {
      checkedList: [],
      tickets: null,
    };
  }

  componentDidMount() {
    this.fetchTickets();
  }

  componentDidUpdate(prevProps: TicketListProps) {
    if (prevProps.refresh !== this.props.refresh && this.props.refresh) {
      this.fetchTickets();
    }
  }

  // Fetch tickets from the API
  fetchTickets = async () => {
    try {
      const response = await axios.get('/api/v1/tickets');
      const { data } = response;
      const tickets: TicketData[] = data.data.tickets;
      const checkedList = Array(tickets.length).fill(false);
      this.setState({ tickets, checkedList }, () => {
        this.props.onRefreshed(); // Notify the parent component that the list has been refreshed
      });
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  // Handle switch state change
  handleChange = (index: number, ticketNumber: string) => async (event: ChangeEvent<HTMLInputElement>) => {
    const { checkedList, tickets } = this.state;
    const updatedCheckedList = [...checkedList];
    updatedCheckedList[index] = event.target.checked;
    this.setState({ checkedList: updatedCheckedList });

    if (!event.target.checked) {
      const ticket = tickets![index];
      const payload = {
        issue: 'Ticket is resolved.',
        status: 'closed',
      };
      try {
        await axios.put(`/api/v1/tickets/${ticketNumber}`, payload);
        this.fetchTickets(); // Refresh the ticket list after the update
      } catch (error) {
        console.log('Error updating ticket:', error);
      }
    } else {
      const ticket = tickets![index];
      const payload = {
        issue: 'Ticket opened again.',
        status: 'open',
      };
      try {
        await axios.put(`/api/v1/tickets/${ticketNumber}`, payload);
        this.fetchTickets(); // Refresh the ticket list after the update
      } catch (error) {
        console.log('Error updating ticket:', error);
      }
    }
  };

  // Get the color for the status of the ticket
  getStatusColor = (status: string) => {
    return status === 'closed' ? '#ABB2B9' : '#28B463';
  };

  // Get the color for the AdjustIcon based on ticket conditions
  getAdjustIconColor = (ticket: TicketData) => {
    const today = new Date();
    const deadline = new Date(ticket.deadline);
    const date = new Date(ticket.date);

    if (ticket.status === 'closed') {
      return '#28B463'; // Green color for closed tickets
    } else if (date < deadline && today < deadline) {
      return '#F4D03F'; // Yellow color for tickets with date and today < deadline
    } else if (date > deadline && today > deadline) {
      return '#C0392B'; // Red color for tickets with date and today > deadline
    }

    return ''; // Default color
  };

  // Custom Switch component with dynamic styles
  CustomSwitch = (props: SwitchProps & { index: number }) => {
    const { index, ...otherProps } = props;
    const { tickets } = this.state;
    const ticket = tickets![index];
    const statusColor = this.getStatusColor(ticket.status);
    const trackColor = ticket.status === 'closed' ? statusColor : '#82E0AA'; // Green color for open status
    return (
      <Switch
        {...otherProps}
        size="small"
        checked={ticket.status !== 'closed'} // Set initial switch state based on status
        onChange={this.handleChange(index, ticket.ticket)}
        sx={{
          '& .MuiSwitch-thumb': {
            backgroundColor: statusColor,
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: trackColor,
          },
          '& .MuiSwitch-track': {
            backgroundColor: trackColor,
          },
          '& .Mui-checked': {
            color: statusColor,
          },
        }}
      />
    );
  };

  render() {
    const { tickets } = this.state;

    return (
      <div className="ticketListContainer">
        <List className="ticketList">
          {tickets &&
            tickets.map((ticket, index) => (
              <ListItem key={ticket.ticket} alignItems="flex-start" className="listItem">
                <Box className="listItemBox">
                  <ListItemText
                    primary={
                      <Box className="listItemPrimary">
                        <Typography variant="body2" color="text.primary" className="listItemText">
                          {`${ticket.client}`}
                        </Typography>
                        <Typography variant="body2" color="#ABB2B9" className="listItemText">
                          {`${ticket.deadline.substring(8, 10)}/${ticket.deadline.substring(5, 7)}/${ticket.deadline.substring(
                            0,
                            4
                          )}`}
                        </Typography>
                        <Box className="listItemSecondaryBox">
                          <this.CustomSwitch
                            index={index} // Use the index as the identifier for the switch
                            inputProps={{ 'aria-label': `controlled ${ticket.ticket}` }}
                            className="listItemSwitch"
                          />
                          <AdjustIcon
                            className="listItemIcon"
                            style={{ color: this.getAdjustIconColor(ticket) }}
                          />
                        </Box>
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <Box className="listItemSecondary">
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            className="listItemText"
                          >
                            {ticket.issue}
                          </Typography>
                        </Box>
                      </React.Fragment>
                    }
                  />
                </Box>
              </ListItem>
            ))}
        </List>
      </div>
    );
  }
}

export default TicketList;
