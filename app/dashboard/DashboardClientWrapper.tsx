'use client';

import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import StatCard from './components/StatCard';
import AddDataCard from './components/AddDataCard';
import RevenueChart from './components/RevenueChart';
import RecentTransactionsCard from './components/DashboardCards/RecentTransactionsCard';
import OccupancyRateCard from './components/DashboardCards/OccupancyRateCard';
import UpcomingRentCard from './components/DashboardCards/UpcomingRentCard';
import dummyKostData from './data/dummyKostData';

// Mendapatkan data default kost
const defaultKostData = dummyKostData.kost1;

export default function DashboardClientWrapper({ initialSelectedKost = "kost1" }: { initialSelectedKost?: string }) {
  const [currentKostData, setCurrentKostData] = useState(defaultKostData);
  const [selectedKost, setSelectedKost] = useState(initialSelectedKost);

  useEffect(() => {
    // Menangani perubahan dari luar komponen (misalnya dari sidebar melalui localStorage)
    const handleStorageChange = () => {
      const storedKost = localStorage.getItem("selectedKost");
      if (storedKost && storedKost !== selectedKost) {
        setSelectedKost(storedKost);
      }
    };

    // Inisialisasi
    const storedKost = localStorage.getItem("selectedKost") || initialSelectedKost;
    if (storedKost !== selectedKost) {
      setSelectedKost(storedKost);
    }

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [selectedKost, initialSelectedKost]);

  useEffect(() => {
    const kostData = dummyKostData[selectedKost as keyof typeof dummyKostData] || defaultKostData;
    setCurrentKostData(kostData);
  }, [selectedKost]);

  // Map string icon names to actual components
  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case 'AttachMoneyIcon':
        return <AttachMoneyIcon />;
      case 'GroupIcon':
        return <GroupIcon />;
      case 'LocalLaundryServiceIcon':
        return <LocalLaundryServiceIcon />;
      case 'MeetingRoomIcon':
        return <MeetingRoomIcon />;
      default:
        return <AttachMoneyIcon />; // fallback icon
    }
  };

  // Transform icons in stats data
  const transformedStatsData = currentKostData.statsDataWithIcons.map(stat => ({
    ...stat,
    icon: getIconComponent(stat.icon)
  }));

  return (
    <Box sx={{ p: 1, maxWidth: "100vw", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Selamat Datang, Admin!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Berikut adalah ringkasan performa bisnis Anda hari ini untuk {currentKostData.name}.
        </Typography>
      </Box>

      {/* Grid Bento Box */}
      <Grid container spacing={1} sx={{ mb: 1 }}>
        {/* Baris 1: Statistik utama */}
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
          <StatCard
            title={transformedStatsData[0].title}
            value={transformedStatsData[0].value}
            icon={transformedStatsData[0].icon}
            color={transformedStatsData[0].color}
            trend={transformedStatsData[0].trend}
            caption={transformedStatsData[0].caption || ""}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
          <StatCard
            title={transformedStatsData[1].title}
            value={transformedStatsData[1].value}
            icon={transformedStatsData[1].icon}
            color={transformedStatsData[1].color}
            trend={transformedStatsData[1].trend}
            caption={transformedStatsData[1].caption || ""}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
          <StatCard
            title={transformedStatsData[2].title}
            value={transformedStatsData[2].value}
            icon={transformedStatsData[2].icon}
            color={transformedStatsData[2].color}
            trend={transformedStatsData[2].trend}
            caption={transformedStatsData[2].caption || ""}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
          <StatCard
            title={transformedStatsData[3].title}
            value={transformedStatsData[3].value}
            icon={transformedStatsData[3].icon}
            color={transformedStatsData[3].color}
            trend={transformedStatsData[3].trend}
            caption={transformedStatsData[3].caption || ""}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2, lg: 2 }}>
          <AddDataCard />
        </Grid>

        {/* Baris 2: Okupansi dan Total Kamar */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <OccupancyRateCard
            occupiedUnits={currentKostData.occupancyData.occupiedUnits}
            totalUnits={currentKostData.occupancyData.totalUnits}
            occupancyPercentage={currentKostData.occupancyData.occupancyPercentage}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <StatCard
            title="Total Kamar"
            value={currentKostData.occupancyData.totalUnits.toString()}
            icon={<MeetingRoomIcon />}
            color="info"
            trend={{ isUp: false, percentage: "100%", label: "kapasitas terdaftar" }}
            caption=""
          />
        </Grid>

        {/* Baris 3: Transaksi Terbaru dan Sewa Mendatang */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <RecentTransactionsCard transactions={currentKostData.transactionsData} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <UpcomingRentCard rentPayments={currentKostData.rentData} />
        </Grid>

        {/* Grafik Pendapatan (lebar penuh) */}
        <Grid size={{ xs: 12 }}>
          <RevenueChart />
        </Grid>
      </Grid>
    </Box>
  );
}