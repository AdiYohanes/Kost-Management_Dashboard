"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Stack,
  Tooltip,
  IconButton,
  Avatar,
} from "@mui/material";

// Import Icons
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function Navbar({ drawerWidth }: { drawerWidth: number }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        bgcolor: "background.default",
        color: "text.primary",
        boxShadow: 1,
      }}
    >
      <Toolbar>
        {/* --- KIRI: Judul --- */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 4, fontWeight: "bold" }}
        >
          Dashboard
        </Typography>

        {/* --- TENGAH: Search Bar --- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "grey.100",
            borderRadius: 4,
            p: "4px 12px",
            width: { xs: "100%", sm: "300px", md: "400px" },
            border: "1px solid",
            borderColor: "transparent",
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "grey.50",
              borderColor: "grey.300",
            },
          }}
        >
          <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
          <InputBase placeholder="Search..." sx={{ width: "100%" }} />
        </Box>

        {/* --- SPACER --- */}
        <Box sx={{ flexGrow: 1 }} />

        {/* --- KANAN: Actions & Profil --- */}
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Tombol Create */}
          <Tooltip title="Create New">
            <IconButton
              sx={{
                bgcolor: "grey.50",
                width: 40,
                height: 40,
                border: "1px solid",
                borderColor: "grey.200",
                "&:hover": {
                  borderColor: "success.light",
                },
              }}
            >
              <AddCircleOutlineIcon color="success" />
            </IconButton>
          </Tooltip>

          {/* Tombol Notifikasi */}
          <Tooltip title="Notifikasi" placement="bottom">
            <IconButton
              sx={{
                bgcolor: "grey.100",
                width: 40,
                height: 40,
                border: "1px solid",
                borderColor: "transparent",
                "&:hover": {
                  borderColor: "success.light",
                  bgcolor: "grey.200",
                },
              }}
            >
              <NotificationsNoneIcon sx={{ color: "text.secondary" }} />
            </IconButton>
          </Tooltip>

          {/* Profil Widget */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              p: 0.5,
              pr: 1,
              borderRadius: 2,
              "&:hover": { bgcolor: "grey.50" },
            }}
          >
            <Avatar
              alt="Rizky Fauzan"
              src="https://i.pravatar.cc/150?img=12"
              sx={{ width: 40, height: 40 }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", lineHeight: 1.2 }}
              >
                Rizky Fauzan
              </Typography>
              <Typography variant="caption" color="text.secondary">
                rizky@example.com
              </Typography>
            </Box>
            <KeyboardArrowDownIcon color="action" />
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
