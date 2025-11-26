"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  Chip,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Info as InfoIcon,
  AccountCircle as AccountIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Storage as StorageIcon,
} from "@mui/icons-material";

interface SettingOption {
  title: string;
  description: string;
  enabled: boolean;
}

interface SystemInfo {
  name: string;
  value: string;
}

export default function SettingsPageContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    billing: true,
    maintenance: false,
  });
  
  const [generalSettings, setGeneralSettings] = useState({
    appName: "Sistem Manajemen Kost",
    company: "Kost Management Co.",
    address: "Jl. Contoh No. 123, Kota Surabaya",
    phone: "+62 812-3456-7890",
    email: "admin@kostmanagement.com",
  });

  const settingOptions: SettingOption[] = [
    { title: "Login Otomatis", description: "Login otomatis untuk pengguna terpercaya", enabled: true },
    { title: "Notifikasi Email", description: "Kirim notifikasi ke email pengguna", enabled: true },
    { title: "Backup Otomatis", description: "Lakukan backup data secara otomatis", enabled: true },
    { title: "Mode Gelap", description: "Gunakan tema gelap untuk antarmuka", enabled: false },
  ];

  const systemInfo: SystemInfo[] = [
    { name: "Versi Aplikasi", value: "1.2.3" },
    { name: "Database", value: "PostgreSQL 15.2" },
    { name: "Server", value: "Node.js 18.17.0" },
    { name: "Framework", value: "Next.js 14.0.0" },
    { name: "Waktu Server", value: new Date().toLocaleString('id-ID') },
    { name: "Lisensi", value: "Komersial" },
  ];

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleGeneralSettingChange = (field: keyof typeof generalSettings, value: string) => {
    setGeneralSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Simulasi penyimpanan pengaturan
    console.log("Pengaturan disimpan:", { notifications, generalSettings });
    alert("Pengaturan berhasil disimpan!");
  };

  const tabLabels = [
    { label: "Umum", icon: <SettingsIcon /> },
    { label: "Notifikasi", icon: <NotificationsIcon /> },
    { label: "Sistem", icon: <InfoIcon /> },
    { label: "Tentang", icon: <InfoIcon /> },
  ];

  return (
    <Box sx={{ p: 3, maxWidth: "100vw", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom color="text.primary">
          Pengaturan Sistem
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kelola konfigurasi dan preferensi aplikasi manajemen kost Anda
        </Typography>
      </Box>

      {/* Tab Navigation */}
      <Paper 
        sx={{ 
          borderRadius: 3,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0',
          mb: 3
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
            }
          }}
        >
          {tabLabels.map((tab, index) => (
            <Tab 
              key={index} 
              label={tab.label} 
              icon={tab.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* General Settings Tab */}
          {activeTab === 0 && (
            <Paper 
              sx={{ 
                p: 3, 
                bgcolor: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e2e8f0',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <SettingsIcon sx={{ mr: 1, color: '#1976d2' }} />
                <Typography variant="h6" fontWeight={700}>
                  Pengaturan Umum
                </Typography>
              </Box>
              
              <Stack spacing={3}>
                <TextField
                  label="Nama Aplikasi"
                  variant="outlined"
                  fullWidth
                  value={generalSettings.appName}
                  onChange={(e) => handleGeneralSettingChange('appName', e.target.value)}
                  sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                />
                
                <TextField
                  label="Nama Perusahaan"
                  variant="outlined"
                  fullWidth
                  value={generalSettings.company}
                  onChange={(e) => handleGeneralSettingChange('company', e.target.value)}
                  sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                />
                
                <TextField
                  label="Alamat"
                  variant="outlined"
                  fullWidth
                  value={generalSettings.address}
                  onChange={(e) => handleGeneralSettingChange('address', e.target.value)}
                  sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                />
                
                <TextField
                  label="Nomor Telepon"
                  variant="outlined"
                  fullWidth
                  value={generalSettings.phone}
                  onChange={(e) => handleGeneralSettingChange('phone', e.target.value)}
                  sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                />
                
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={generalSettings.email}
                  onChange={(e) => handleGeneralSettingChange('email', e.target.value)}
                  sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                />
              </Stack>
            </Paper>
          )}

          {/* Notification Settings Tab */}
          {activeTab === 1 && (
            <Paper 
              sx={{ 
                p: 3, 
                bgcolor: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e2e8f0',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <NotificationsIcon sx={{ mr: 1, color: '#f57c00' }} />
                <Typography variant="h6" fontWeight={700}>
                  Pengaturan Notifikasi
                </Typography>
              </Box>
              
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.email}
                      onChange={() => handleNotificationChange('email')}
                      color="primary"
                    />
                  }
                  label="Email"
                  sx={{ mb: 1 }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.sms}
                      onChange={() => handleNotificationChange('sms')}
                      color="primary"
                    />
                  }
                  label="SMS"
                  sx={{ mb: 1 }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.push}
                      onChange={() => handleNotificationChange('push')}
                      color="primary"
                    />
                  }
                  label="Notifikasi Push"
                  sx={{ mb: 1 }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.billing}
                      onChange={() => handleNotificationChange('billing')}
                      color="primary"
                    />
                  }
                  label="Pemberitahuan Tagihan"
                  sx={{ mb: 1 }}
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.maintenance}
                      onChange={() => handleNotificationChange('maintenance')}
                      color="primary"
                    />
                  }
                  label="Pemberitahuan Perawatan"
                  sx={{ mb: 1 }}
                />
              </Stack>
            </Paper>
          )}

          {/* System Info Tab */}
          {activeTab === 2 && (
            <Paper 
              sx={{ 
                p: 3, 
                bgcolor: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e2e8f0',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <InfoIcon sx={{ mr: 1, color: '#388e3c' }} />
                <Typography variant="h6" fontWeight={700}>
                  Informasi Sistem
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                {systemInfo.map((info, index) => (
                  <Grid key={index} size={{ xs: 12, sm: 6 }}>
                    <Paper 
                      sx={{ 
                        p: 2, 
                        bgcolor: 'grey.50',
                        borderRadius: 2,
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {info.name}
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {info.value}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

          {/* About Tab */}
          {activeTab === 3 && (
            <Paper 
              sx={{ 
                p: 3, 
                bgcolor: 'white',
                borderRadius: 3,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e2e8f0',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <InfoIcon sx={{ mr: 1, color: '#7b1fa2' }} />
                <Typography variant="h6" fontWeight={700}>
                  Tentang Aplikasi
                </Typography>
              </Box>
              
              <Stack spacing={2}>
                <Typography variant="body1">
                  <strong>Sistem Manajemen Kost</strong> adalah aplikasi komprehensif untuk mengelola 
                  properti kost Anda dengan efisien dan profesional.
                </Typography>
                
                <Typography variant="body1">
                  Aplikasi ini dirancang untuk membantu pemilik kost dalam mengelola unit, penghuni, 
                  pembayaran, laundry, dan berbagai aspek operasional lainnya dalam satu platform terpadu.
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2" color="text.secondary">
                  <strong>Versi:</strong> 1.2.3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Developer:</strong> Kost Management Co.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Lisensi:</strong> Komersial
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Dibuat:</strong> 2024
                </Typography>
              </Stack>
            </Paper>
          )}
        </Grid>
        
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Quick Settings Card */}
          <Paper 
            sx={{ 
              p: 3, 
              bgcolor: 'white',
              borderRadius: 3,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e2e8f0',
              mb: 3
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={2}>
              Pengaturan Cepat
            </Typography>
            
            <List>
              {settingOptions.map((option, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                    <Chip
                      icon={option.enabled ? <SecurityIcon /> : <PaletteIcon />}
                      label={option.enabled ? "Aktif" : "Nonaktif"}
                      size="small"
                      color={option.enabled ? "success" : "default"}
                      variant="filled"
                      sx={{
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        height: "24px",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={option.title}
                    secondary={option.description}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                  <Switch
                    checked={option.enabled}
                    onChange={() => {}}
                    color="primary"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
          
          {/* System Status Card */}
          <Paper 
            sx={{ 
              p: 3, 
              bgcolor: 'white',
              borderRadius: 3,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e2e8f0',
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={2}>
              Status Sistem
            </Typography>
            
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Database</Typography>
                <Chip 
                  label="Tersedia" 
                  size="small" 
                  color="success" 
                  variant="filled"
                  sx={{ 
                    borderRadius: 1,
                    fontSize: "0.75rem",
                    height: "20px",
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Server</Typography>
                <Chip 
                  label="Stabil" 
                  size="small" 
                  color="success" 
                  variant="filled"
                  sx={{ 
                    borderRadius: 1,
                    fontSize: "0.75rem",
                    height: "20px",
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Backup</Typography>
                <Chip 
                  label="Terbaru" 
                  size="small" 
                  color="success" 
                  variant="filled"
                  sx={{ 
                    borderRadius: 1,
                    fontSize: "0.75rem",
                    height: "20px",
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Lisensi</Typography>
                <Chip 
                  label="Valid" 
                  size="small" 
                  color="success" 
                  variant="filled"
                  sx={{ 
                    borderRadius: 1,
                    fontSize: "0.75rem",
                    height: "20px",
                  }}
                />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 3
            }
          }}
        >
          Simpan Pengaturan
        </Button>
      </Box>
    </Box>
  );
}