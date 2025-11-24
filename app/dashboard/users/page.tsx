import { Box, Typography, Grid, Paper } from "@mui/material";
import { createDashboardMetadata } from "@/utils/metadata";

export const metadata = createDashboardMetadata({
  subtitle: "Users",
  description: "Manage users",
});

export default function UsersPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Users Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kelola pengguna sistem di sini
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Daftar Users</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Konten halaman users akan ditampilkan di sini
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
