"use client";

import { Suspense } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import dynamic from 'next/dynamic';

// Lazy load komponen LaundryManagement untuk menghindari masalah hydration
const LaundryManagement = dynamic(() => import('./laundry-management'), {
  loading: () => (
    <Box sx={{ p: 3 }}>
      <LinearProgress />
    </Box>
  ),
  ssr: false // Nonaktifkan SSR untuk menghindari masalah hydration
});

export default function LaundryManagementWrapper() {
  return (
    <Box sx={{ p: 3, maxWidth: "100vw", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom color="text.primary">
          Laundry Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kelola layanan laundry dengan sistem yang modern dan efisien
        </Typography>
      </Box>

      <Suspense
        fallback={
          <Box sx={{ p: 3 }}>
            <LinearProgress />
          </Box>
        }
      >
        <LaundryManagement />
      </Suspense>
    </Box>
  );
}