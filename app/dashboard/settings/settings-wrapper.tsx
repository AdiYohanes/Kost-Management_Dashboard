"use client";

import { Suspense } from "react";
import { Box, LinearProgress } from "@mui/material";
import dynamic from 'next/dynamic';

// Lazy load komponen SettingsPageContent untuk menghindari masalah hydration
const SettingsPageContent = dynamic(() => import('./settings-content'), {
  loading: () => (
    <Box sx={{ p: 3 }}>
      <LinearProgress />
    </Box>
  ),
  ssr: false // Nonaktifkan SSR untuk menghindari masalah hydration
});

export default function SettingsPageWrapper() {
  return (
    <Suspense
      fallback={
        <Box sx={{ p: 3 }}>
          <LinearProgress />
        </Box>
      }
    >
      <SettingsPageContent />
    </Suspense>
  );
}