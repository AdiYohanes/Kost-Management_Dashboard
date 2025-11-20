import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Selamat Datang, Admin!
      </Typography>

      {/* Grid Container untuk Kartu Statistik */}
      <Grid container spacing={3}>
        {/* Kartu 1 */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{ p: 3, display: "flex", flexDirection: "column", height: 140 }}
          >
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Total Pengguna
            </Typography>
            <Typography component="p" variant="h4">
              1,250
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              naik 5% dari kemarin
            </Typography>
          </Paper>
        </Grid>

        {/* Kartu 2 */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{ p: 3, display: "flex", flexDirection: "column", height: 140 }}
          >
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Pendapatan
            </Typography>
            <Typography component="p" variant="h4">
              Rp 5.000.000
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              bulan ini
            </Typography>
          </Paper>
        </Grid>

        {/* Kartu 3 */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{ p: 3, display: "flex", flexDirection: "column", height: 140 }}
          >
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Pesanan Baru
            </Typography>
            <Typography component="p" variant="h4">
              34
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              perlu diproses
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
