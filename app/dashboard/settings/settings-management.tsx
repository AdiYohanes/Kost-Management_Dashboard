"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Divider,
  Alert,
} from "@mui/material";

interface GeneralSettings {
  businessName: string;
  contactEmail: string;
  contactPhone: string;
  businessAddress: string;
  logoUrl: string;
  timezone: string;
  language: string;
  currency: string;
}

interface FinancialSettings {
  enableTax: boolean;
  taxRate: number;
  enableLateFees: boolean;
  lateFeeAmount: number;
  defaultPaymentMethod: string;
  enableDiscounts: boolean;
  defaultDiscountRate: number;
}

interface NotificationSettings {
  enableEmail: boolean;
  enableSMS: boolean;
  pickupReminderHours: number;
  bookingExpiryReminderDays: number;
  paymentReminderDays: number;
}

interface SecuritySettings {
  enableTwoFactor: boolean;
  maxLoginAttempts: number;
  sessionTimeout: number;
  requirePasswordChange: boolean;
  passwordChangeDays: number;
}

export default function SettingsManagement() {
  const [activeTab, setActiveTab] = useState(0);
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    businessName: "Laundry & Kost System",
    contactEmail: "admin@company.com",
    contactPhone: "+62 812-3456-7890",
    businessAddress: "Jl. Contoh No. 123, Jakarta",
    logoUrl: "",
    timezone: "Asia/Jakarta",
    language: "id",
    currency: "IDR",
  });

  const [financialSettings, setFinancialSettings] = useState<FinancialSettings>(
    {
      enableTax: true,
      taxRate: 10,
      enableLateFees: true,
      lateFeeAmount: 50000,
      defaultPaymentMethod: "cash",
      enableDiscounts: false,
      defaultDiscountRate: 5,
    }
  );

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      enableEmail: true,
      enableSMS: false,
      pickupReminderHours: 24,
      bookingExpiryReminderDays: 1,
      paymentReminderDays: 3,
    });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    enableTwoFactor: false,
    maxLoginAttempts: 3,
    sessionTimeout: 30,
    requirePasswordChange: true,
    passwordChangeDays: 90,
  });

  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSave = () => {
    // In a real app, this would save to an API
    console.log({
      generalSettings,
      financialSettings,
      notificationSettings,
      securitySettings,
    });

    setSaveStatus({
      type: "success",
      message: "Pengaturan berhasil disimpan!",
    });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleGeneralChange = (field: keyof GeneralSettings, value: string) => {
    setGeneralSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleFinancialChange = (
    field: keyof FinancialSettings,
    value: any
  ) => {
    setFinancialSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (
    field: keyof NotificationSettings,
    value: any
  ) => {
    setNotificationSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field: keyof SecuritySettings, value: any) => {
    setSecuritySettings((prev) => ({ ...prev, [field]: value }));
  };

  const a11yProps = (index: number) => ({
    id: `settings-tab-${index}`,
    "aria-controls": `settings-tabpanel-${index}`,
  });

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", mx: "auto" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Konfigurasi pengaturan aplikasi
        </Typography>
      </Box>

      {saveStatus && (
        <Alert severity={saveStatus.type} sx={{ mb: 3, borderRadius: 2 }}>
          {saveStatus.message}
        </Alert>
      )}

      <Paper
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: 1,
          overflow: "hidden",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{
            backgroundColor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tab label="Umum" {...a11yProps(0)} sx={{ fontWeight: 600 }} />
          <Tab label="Finansial" {...a11yProps(1)} sx={{ fontWeight: 600 }} />
          <Tab label="Notifikasi" {...a11yProps(2)} sx={{ fontWeight: 600 }} />
          <Tab label="Keamanan" {...a11yProps(3)} sx={{ fontWeight: 600 }} />
        </Tabs>
      </Paper>

      {/* General Settings Tab */}
      {activeTab === 0 && (
        <Paper
          sx={{
            borderRadius: 3,
            boxShadow: 1,
            overflow: "hidden",
            mb: 3,
          }}
        >
          <Box
            sx={{
              p: 3,
              bgcolor: "grey.50",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Pengaturan Umum
            </Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Nama Bisnis"
                  value={generalSettings.businessName}
                  onChange={(e) =>
                    handleGeneralChange("businessName", e.target.value)
                  }
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email Kontak"
                  value={generalSettings.contactEmail}
                  onChange={(e) =>
                    handleGeneralChange("contactEmail", e.target.value)
                  }
                  type="email"
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Telepon Kontak"
                  value={generalSettings.contactPhone}
                  onChange={(e) =>
                    handleGeneralChange("contactPhone", e.target.value)
                  }
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Alamat Bisnis"
                  value={generalSettings.businessAddress}
                  onChange={(e) =>
                    handleGeneralChange("businessAddress", e.target.value)
                  }
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="URL Logo"
                  value={generalSettings.logoUrl}
                  onChange={(e) =>
                    handleGeneralChange("logoUrl", e.target.value)
                  }
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={generalSettings.timezone}
                    label="Timezone"
                    onChange={(e) =>
                      handleGeneralChange("timezone", e.target.value)
                    }
                  >
                    <MenuItem value="Asia/Jakarta">
                      Asia/Jakarta (GMT+7)
                    </MenuItem>
                    <MenuItem value="Asia/Makassar">
                      Asia/Makassar (GMT+8)
                    </MenuItem>
                    <MenuItem value="Asia/Jayapura">
                      Asia/Jayapura (GMT+9)
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                  <InputLabel>Bahasa</InputLabel>
                  <Select
                    value={generalSettings.language}
                    label="Bahasa"
                    onChange={(e) =>
                      handleGeneralChange("language", e.target.value)
                    }
                  >
                    <MenuItem value="id">Indonesia</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                  <InputLabel>Unit Mata Uang</InputLabel>
                  <Select
                    value={generalSettings.currency}
                    label="Unit Mata Uang"
                    onChange={(e) =>
                      handleGeneralChange("currency", e.target.value)
                    }
                  >
                    <MenuItem value="IDR">IDR (Rp)</MenuItem>
                    <MenuItem value="USD">USD ($)</MenuItem>
                    <MenuItem value="EUR">EUR (€)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Paper>
      )}

      {/* Financial Settings Tab */}
      {activeTab === 1 && (
        <Paper
          sx={{
            borderRadius: 3,
            boxShadow: 1,
            overflow: "hidden",
            mb: 3,
          }}
        >
          <Box
            sx={{
              p: 3,
              bgcolor: "grey.50",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Pengaturan Finansial
            </Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={financialSettings.enableTax}
                      onChange={(e) =>
                        handleFinancialChange("enableTax", e.target.checked)
                      }
                      color="primary"
                    />
                  }
                  label="Aktifkan Pajak"
                  sx={{ mb: 2, display: "flex" }}
                />
                {financialSettings.enableTax && (
                  <TextField
                    fullWidth
                    label="Tarif Pajak (%)"
                    type="number"
                    value={financialSettings.taxRate}
                    onChange={(e) =>
                      handleFinancialChange(
                        "taxRate",
                        parseFloat(e.target.value)
                      )
                    }
                    inputProps={{ min: 0, max: 100, step: 0.1 }}
                    sx={{ mb: 2 }}
                    variant="outlined"
                  />
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={financialSettings.enableLateFees}
                      onChange={(e) =>
                        handleFinancialChange(
                          "enableLateFees",
                          e.target.checked
                        )
                      }
                      color="primary"
                    />
                  }
                  label="Aktifkan Denda Keterlambatan"
                  sx={{ mb: 2, display: "flex" }}
                />
                {financialSettings.enableLateFees && (
                  <TextField
                    fullWidth
                    label="Jumlah Denda (Rp)"
                    type="number"
                    value={financialSettings.lateFeeAmount}
                    onChange={(e) =>
                      handleFinancialChange(
                        "lateFeeAmount",
                        parseFloat(e.target.value)
                      )
                    }
                    sx={{ mb: 2 }}
                    variant="outlined"
                  />
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={financialSettings.enableDiscounts}
                      onChange={(e) =>
                        handleFinancialChange(
                          "enableDiscounts",
                          e.target.checked
                        )
                      }
                      color="primary"
                    />
                  }
                  label="Aktifkan Diskon"
                  sx={{ mb: 2, display: "flex" }}
                />
                {financialSettings.enableDiscounts && (
                  <TextField
                    fullWidth
                    label="Tarif Diskon Default (%)"
                    type="number"
                    value={financialSettings.defaultDiscountRate}
                    onChange={(e) =>
                      handleFinancialChange(
                        "defaultDiscountRate",
                        parseFloat(e.target.value)
                      )
                    }
                    inputProps={{ min: 0, max: 100, step: 0.1 }}
                    sx={{ mb: 2 }}
                    variant="outlined"
                  />
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                  <InputLabel>Metode Pembayaran Default</InputLabel>
                  <Select
                    value={financialSettings.defaultPaymentMethod}
                    label="Metode Pembayaran Default"
                    onChange={(e) =>
                      handleFinancialChange(
                        "defaultPaymentMethod",
                        e.target.value
                      )
                    }
                  >
                    <MenuItem value="cash">Tunai</MenuItem>
                    <MenuItem value="bank_transfer">Transfer Bank</MenuItem>
                    <MenuItem value="credit_card">Kartu Kredit</MenuItem>
                    <MenuItem value="e_wallet">E-Wallet</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Paper>
      )}

      {/* Notification Settings Tab */}
      {activeTab === 2 && (
        <Paper
          sx={{
            borderRadius: 3,
            boxShadow: 1,
            overflow: "hidden",
            mb: 3,
          }}
        >
          <Box
            sx={{
              p: 3,
              bgcolor: "grey.50",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Pengaturan Notifikasi
            </Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.enableEmail}
                      onChange={(e) =>
                        handleNotificationChange(
                          "enableEmail",
                          e.target.checked
                        )
                      }
                      color="primary"
                    />
                  }
                  label="Aktifkan Email"
                  sx={{ mb: 2, display: "flex" }}
                />
                {notificationSettings.enableEmail && (
                  <>
                    <TextField
                      fullWidth
                      label="Waktu Pengingat Pengambilan (jam sebelum)"
                      type="number"
                      value={notificationSettings.pickupReminderHours}
                      onChange={(e) =>
                        handleNotificationChange(
                          "pickupReminderHours",
                          parseInt(e.target.value)
                        )
                      }
                      inputProps={{ min: 1 }}
                      sx={{ mb: 2 }}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Waktu Pengingat Kedaluarsa Booking (hari sebelum)"
                      type="number"
                      value={notificationSettings.bookingExpiryReminderDays}
                      onChange={(e) =>
                        handleNotificationChange(
                          "bookingExpiryReminderDays",
                          parseInt(e.target.value)
                        )
                      }
                      inputProps={{ min: 1 }}
                      sx={{ mb: 2 }}
                      variant="outlined"
                    />
                  </>
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.enableSMS}
                      onChange={(e) =>
                        handleNotificationChange("enableSMS", e.target.checked)
                      }
                      color="primary"
                    />
                  }
                  label="Aktifkan SMS"
                  sx={{ mb: 2, display: "flex" }}
                />
                {(notificationSettings.enableEmail ||
                  notificationSettings.enableSMS) && (
                  <TextField
                    fullWidth
                    label="Waktu Pengingat Pembayaran (hari sebelum)"
                    type="number"
                    value={notificationSettings.paymentReminderDays}
                    onChange={(e) =>
                      handleNotificationChange(
                        "paymentReminderDays",
                        parseInt(e.target.value)
                      )
                    }
                    inputProps={{ min: 1 }}
                    sx={{ mb: 2 }}
                    variant="outlined"
                  />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Paper>
      )}

      {/* Security Settings Tab */}
      {activeTab === 3 && (
        <Paper
          sx={{
            borderRadius: 3,
            boxShadow: 1,
            overflow: "hidden",
            mb: 3,
          }}
        >
          <Box
            sx={{
              p: 3,
              bgcolor: "grey.50",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Pengaturan Keamanan
            </Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={securitySettings.enableTwoFactor}
                      onChange={(e) =>
                        handleSecurityChange(
                          "enableTwoFactor",
                          e.target.checked
                        )
                      }
                      color="primary"
                    />
                  }
                  label="Aktifkan Otentikasi Dua Faktor"
                  sx={{ mb: 2, display: "flex" }}
                />
                <TextField
                  fullWidth
                  label="Maksimal Percobaan Login"
                  type="number"
                  value={securitySettings.maxLoginAttempts}
                  onChange={(e) =>
                    handleSecurityChange(
                      "maxLoginAttempts",
                      parseInt(e.target.value)
                    )
                  }
                  inputProps={{ min: 1, max: 10 }}
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Session Timeout (menit)"
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) =>
                    handleSecurityChange(
                      "sessionTimeout",
                      parseInt(e.target.value)
                    )
                  }
                  inputProps={{ min: 5, max: 120 }}
                  sx={{ mb: 2 }}
                  variant="outlined"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={securitySettings.requirePasswordChange}
                      onChange={(e) =>
                        handleSecurityChange(
                          "requirePasswordChange",
                          e.target.checked
                        )
                      }
                      color="primary"
                    />
                  }
                  label="Wajibkan Ganti Password"
                  sx={{ mb: 2, display: "flex" }}
                />
                {securitySettings.requirePasswordChange && (
                  <TextField
                    fullWidth
                    label="Ganti Password Setiap (hari)"
                    type="number"
                    value={securitySettings.passwordChangeDays}
                    onChange={(e) =>
                      handleSecurityChange(
                        "passwordChangeDays",
                        parseInt(e.target.value)
                      )
                    }
                    inputProps={{ min: 30, max: 365 }}
                    sx={{ mb: 2 }}
                    variant="outlined"
                  />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Paper>
      )}

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSave}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 600,
            boxShadow: 2,
            "&:hover": {
              boxShadow: 3,
            },
          }}
        >
          Simpan Pengaturan
        </Button>
      </Box>
    </Box>
  );
}
