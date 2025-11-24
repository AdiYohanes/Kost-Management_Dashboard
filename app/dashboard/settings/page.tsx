import { Box, Typography, Grid, Paper } from "@mui/material";
import { createDashboardMetadata } from "@/utils/metadata";

export const metadata = createDashboardMetadata({
  subtitle: "Settings",
  description: "Application settings",
});

export default function SettingsPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Konfigurasi pengaturan aplikasi
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Pengaturan Umum</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Konten halaman settings akan ditampilkan di sini
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
