"use client";

import { Suspense } from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import dynamic from 'next/dynamic';

// Lazy load komponen UserManagement untuk menghindari masalah hydration
const UserManagement = dynamic(() => import('./user-management'), {
  loading: () => (
    <Box sx={{ p: 3 }}>
      <LinearProgress />
    </Box>
  ),
  ssr: false // Nonaktifkan SSR untuk menghindari masalah hydration
});

export default function UserManagementWrapper() {
  return (
    <Box sx={{ p: 3, maxWidth: "100vw", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom color="text.primary">
          Users Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kelola pengguna sistem dengan sistem manajemen yang modern dan efisien
        </Typography>
      </Box>

      <Suspense
        fallback={
          <Box sx={{ p: 3 }}>
            <LinearProgress />
          </Box>
        }
      >
        <UserManagement />
      </Suspense>
    </Box>
  );
}