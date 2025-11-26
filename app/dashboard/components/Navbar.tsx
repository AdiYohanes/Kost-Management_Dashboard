"use client";

import React, { useState } from "react";
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
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Badge,
  List,
  ListItem,
  ListItemText,
  Popover,
  Button,
} from "@mui/material";

// Import Icons
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar({ drawerWidth }: { drawerWidth: number }) {
  // State for profile dropdown
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // State for notifications
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const notificationOpen = Boolean(notificationAnchorEl);

  // Sample notification data
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New message received", description: "You have a new message from John", time: "2 min ago", unread: true },
    { id: 2, title: "Server update", description: "Server will be updated tonight", time: "1 hour ago", unread: true },
    { id: 3, title: "Payment received", description: "Your payment has been processed", time: "3 hours ago", unread: false },
    { id: 4, title: "Account security", description: "Please update your password", time: "1 day ago", unread: true },
  ]);

  // Handle profile menu open/close
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  // Handle notification menu open/close
  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here
    handleProfileClose();
  };

  // Handle notification read
  const handleNotificationClickItem = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
    // Handle notification click logic
  };

  // Handle read all notifications
  const handleReadAll = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  // Count unread notifications
  const unreadCount = notifications.filter(n => n.unread).length;

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
              onClick={handleNotificationClick}
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
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsNoneIcon sx={{ color: "text.secondary" }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Notification Dropdown */}
          <Popover
            anchorEl={notificationAnchorEl}
            open={notificationOpen}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              mt: 0.5,
              '& .MuiPaper-root': {
                width: 350,
                maxWidth: '100%',
                boxShadow: 3,
                borderRadius: 2,
              }
            }}
          >
            <Box sx={{ p: 2, maxHeight: 400, overflow: 'auto' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Notifications
              </Typography>
              <List>
                {notifications.map((notification) => (
                  <ListItem
                    key={notification.id}
                    component="button"
                    onClick={() => handleNotificationClickItem(notification.id)}
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      backgroundColor: notification.unread ? 'grey.50' : 'transparent',
                      '&:hover': { backgroundColor: 'grey.100' },
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <ListItemText
                      primary={notification.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {notification.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {notification.time}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ textAlign: 'center', pt: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleReadAll}
                  disabled={unreadCount === 0}
                >
                  Read All
                </Button>
              </Box>
            </Box>
          </Popover>

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
            onClick={handleProfileClick}
          >
            <Avatar
              alt="Christian Agusta"
              src="https://i.pravatar.cc/150?img=12"
              sx={{ width: 40, height: 40 }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", lineHeight: 1.2 }}
              >
                Christian Agusta
              </Typography>
              <Typography variant="caption" color="text.secondary">
                agusta@example.com
              </Typography>
            </Box>
            <KeyboardArrowDownIcon color="action" />
          </Box>

          {/* Profile Dropdown */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleProfileClose}
            onClick={handleProfileClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => console.log("Profile clicked")}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => console.log("Settings clicked")}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
