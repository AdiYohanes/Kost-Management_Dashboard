import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Chip,
  Divider,
  Avatar,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { orange, green, red } from '@mui/material/colors';

interface RentPayment {
  id: string;
  residentName: string;
  unit: string;
  amount: string;
  dueDate: string;
  daysLeft: number;
}

interface UpcomingRentCardProps {
  title?: string;
  rentPayments: RentPayment[];
}

const getDaysColor = (daysLeft: number) => {
  if (daysLeft <= 0) return red[500]; // merah untuk hari ini atau terlambat
  if (daysLeft <= 3) return orange[500]; // oranye untuk mendekati jatuh tempo
  return green[500]; // hijau untuk masih jauh
};

const getDaysLabel = (daysLeft: number) => {
  if (daysLeft <= 0) return 'Hari Ini';
  return `${daysLeft} Hari Lagi`;
};

const UpcomingRentCard: React.FC<UpcomingRentCardProps> = ({
  title = 'Sewa Mendatang',
  rentPayments,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              width: 32,
              height: 32,
            }}
          >
            <CalendarTodayIcon fontSize="small" />
          </Avatar>
        }
        title={
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            {title}
          </Typography>
        }
        sx={{ pb: 0.5, pt: 1 }}
      />
      <CardContent sx={{ flex: 1, pb: 1, pt: 0.5 }}>
        <List dense>
          {rentPayments.slice(0, 5).map((payment, index) => (
            <React.Fragment key={payment.id}>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    py: 1,
                    px: 1.5,
                    borderRadius: 1,
                    mb: 0.5,
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '36px', color: getDaysColor(payment.daysLeft) }}>
                    <EventNoteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={500}>
                        {payment.residentName}
                      </Typography>
                    }
                    secondary={
                      <Box component="span" display="block">
                        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                          Unit: {payment.unit} • Jatuh tempo: {payment.dueDate}
                        </Typography>
                        <Box component="span" display="flex" justifyContent="space-between" alignItems="center" mt={0.5}>
                          <Typography variant="body2" color="primary" fontWeight={600} component="span">
                            {payment.amount}
                          </Typography>
                          <Box
                            component="span"
                            sx={{
                              fontSize: '0.65rem',
                              height: '20px',
                              px: 1,
                              py: 0.2,
                              borderRadius: 1,
                              color: getDaysColor(payment.daysLeft),
                              border: `1px solid ${getDaysColor(payment.daysLeft)}`,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              lineHeight: '16px',
                            }}
                          >
                            {getDaysLabel(payment.daysLeft)}
                          </Box>
                        </Box>
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
              {index < rentPayments.slice(0, 5).length - 1 && (
                <Divider variant="middle" component="li" sx={{ mx: 2 }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UpcomingRentCard;
