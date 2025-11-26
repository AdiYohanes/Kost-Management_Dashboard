import { Card, CardContent, CardHeader, Typography, Grid, Button, Box } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";

interface QuickActionsCardProps {
  onAddResident?: () => void;
  onRecordPayment?: () => void;
  onAddUnit?: () => void;
  onManageLaundry?: () => void;
}

export default function QuickActionsCard({
  onAddResident,
  onRecordPayment,
  onAddUnit,
  onManageLaundry,
}: QuickActionsCardProps) {
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
            <GroupAddIcon fontSize="small" />
          </Box>
        }
        title={
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            Aksi Cepat
          </Typography>
        }
        sx={{ pb: 0.5, pt: 1 }}
      />
      <CardContent sx={{ flex: 1, pb: 1, pt: 0.5 }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid size={{ xs: 6 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GroupAddIcon />}
              onClick={onAddResident}
              sx={{ height: "100%", py: 1.5 }}
            >
              <Typography variant="body2">Tambah Penghuni</Typography>
            </Button>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<AttachMoneyIcon />}
              onClick={onRecordPayment}
              sx={{ height: "100%", py: 1.5 }}
            >
              <Typography variant="body2">Catat Pembayaran</Typography>
            </Button>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<MeetingRoomIcon />}
              onClick={onAddUnit}
              sx={{ height: "100%", py: 1.5 }}
            >
              <Typography variant="body2">Tambah Unit</Typography>
            </Button>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LocalLaundryServiceIcon />}
              onClick={onManageLaundry}
              sx={{ height: "100%", py: 1.5 }}
            >
              <Typography variant="body2">Layanan Laundry</Typography>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}