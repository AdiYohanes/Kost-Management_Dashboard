"use client";

import React from "react";
import {
  Drawer,
  Toolbar,
  Avatar,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// Import Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
// Catatan: Anda pakai SettingsIcon untuk "Unit Kost", bisa diganti icon lain nanti (misal: HomeWork)

const MENU_ITEMS = [
  { text: "Dashboard", icon: <DashboardIcon /> },
  { text: "Users", icon: <PersonIcon /> },
  { text: "Unit Kost", icon: <SettingsIcon /> },
];

export default function Sidebar({ drawerWidth }: { drawerWidth: number }) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          px: 2.5,
          py: 3,
          cursor: "pointer",
          transition: "all 0.2s",
          borderRadius: 2,
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        {/* 1. LOGO (Kiri) */}
        <Avatar
          sx={{
            width: 44,
            height: 44,
            bgcolor: "#00C853",
            mr: 2,
            boxShadow: "0 4px 12px rgba(0, 200, 83, 0.3)",
          }}
          variant="circular"
        >
          <Typography variant="h5" sx={{ fontWeight: 900, color: "white" }}>
            S
          </Typography>
        </Avatar>

        {/* 2. TEKS (Kanan) */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              color: "#00c853",
              lineHeight: 1.1,
              fontSize: "1rem",
            }}
          >
            SYANTIKA
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#757575",
              fontWeight: 500,
              letterSpacing: "1px",
              fontSize: "0.7rem",
            }}
          >
            KOST RESIDENCE
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      <List>
        {MENU_ITEMS.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
