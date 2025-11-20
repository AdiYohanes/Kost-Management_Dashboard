"use client";

import React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";

// Import Komponen Kita
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const drawerWidth = 240;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* 1. Panggil Navbar (Kirim drawerWidth biar posisinya pas) */}
      <Navbar drawerWidth={drawerWidth} />

      {/* 2. Panggil Sidebar (Kirim drawerWidth biar lebarnya pas) */}
      <Sidebar drawerWidth={drawerWidth} />

      {/* 3. Area Konten Utama */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#F4F6F8", p: 3, minHeight: "100vh" }}
      >
        {/* Spacer ini wajib ada: untuk mendorong konten ke bawah Navbar */}
        <Toolbar />

        {/* Render halaman disini */}
        {children}
      </Box>
    </Box>
  );
}
