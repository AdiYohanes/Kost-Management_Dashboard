import { Box, Typography, Grid, Paper } from "@mui/material";
import { createDashboardMetadata } from "@/utils/metadata";

export const metadata = createDashboardMetadata({
  subtitle: "Laundry",
  description: "Manage laundry services",
});

export default function LaundryPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Laundry Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kelola layanan laundry di sini
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Daftar Laundry</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Konten halaman laundry akan ditampilkan di sini
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}