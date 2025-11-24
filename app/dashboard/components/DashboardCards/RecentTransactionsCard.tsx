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
import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { green, orange, red } from '@mui/material/colors';

interface Transaction {
  id: string;
  name: string;
  description: string;
  amount: string;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
}

interface RecentTransactionsCardProps {
  title?: string;
  transactions: Transaction[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return green[500];
    case 'pending':
      return orange[500];
    case 'overdue':
      return red[500];
    default:
      return 'default';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'paid':
      return 'Lunas';
    case 'pending':
      return 'Pending';
    case 'overdue':
      return 'Terlambat';
    default:
      return status;
  }
};

const RecentTransactionsCard: React.FC<RecentTransactionsCardProps> = ({
  title = 'Transaksi Terbaru',
  transactions,
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
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 1
            }}
          >
            <ReceiptIcon fontSize="small" />
          </Box>
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
          {transactions.slice(0, 5).map((transaction, index) => (
            <React.Fragment key={transaction.id}>
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
                  <ListItemIcon sx={{ minWidth: '36px', color: getStatusColor(transaction.status) }}>
                    <AttachMoneyIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={500}>
                        {transaction.name}
                      </Typography>
                    }
                    secondary={
                      <Box component="span" display="block">
                        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                          {transaction.description}
                        </Typography>
                        <Box component="span" display="flex" justifyContent="space-between" alignItems="center" mt={0.5}>
                          <Typography variant="body2" color="primary" fontWeight={600} component="span">
                            {transaction.amount}
                          </Typography>
                          <Box
                            component="span"
                            sx={{
                              fontSize: '0.65rem',
                              height: '20px',
                              px: 1,
                              py: 0.2,
                              borderRadius: 1,
                              color: getStatusColor(transaction.status),
                              border: `1px solid ${getStatusColor(transaction.status)}`,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              lineHeight: '16px',
                            }}
                          >
                            {getStatusLabel(transaction.status)}
                          </Box>
                        </Box>
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
              {index < transactions.slice(0, 5).length - 1 && (
                <Divider variant="middle" component="li" sx={{ mx: 2 }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentTransactionsCard;
