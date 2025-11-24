'use client';

import { Grid, Typography, Box } from "@mui/material";
import StatCard from "../StatCard";
import AddDataCard from "../AddDataCard";
import RevenueChart from "../RevenueChart";
import RecentTransactionsCard from "./RecentTransactionsCard";
import OccupancyRateCard from "./OccupancyRateCard";
import UpcomingRentCard from "./UpcomingRentCard";
import QuickActionsCard from "./QuickActionsCard";

interface StatData {
  id: number;
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend: {
    isUp: boolean;
    percentage: string;
    label: string;
  };
  caption?: string;
}

interface Transaction {
  id: string;
  name: string;
  description: string;
  amount: string;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
}

interface RentPayment {
  id: string;
  residentName: string;
  unit: string;
  amount: string;
  dueDate: string;
  daysLeft: number;
}

interface OccupancyData {
  occupiedUnits: number;
  totalUnits: number;
  occupancyPercentage: number;
}

interface DashboardContentProps {
  statsData: StatData[];
  occupancyData: OccupancyData;
  transactionsData: Transaction[];
  rentData: RentPayment[];
}

export default function DashboardContent({
  statsData,
  occupancyData,
  transactionsData,
  rentData
}: DashboardContentProps) {
  const handleAddResident = () => {
    console.log("Tambah Penghuni clicked");
    // Implementasi navigasi ke halaman tambah penghuni
  };

  const handleRecordPayment = () => {
    console.log("Catat Pembayaran clicked");
    // Implementasi navigasi ke halaman pembayaran
  };

  const handleAddUnit = () => {
    console.log("Tambah Unit clicked");
    // Implementasi navigasi ke halaman unit kost
  };

  const handleManageLaundry = () => {
    console.log("Layanan Laundry clicked");
    // Implementasi navigasi ke halaman laundry
  };

  interface StatData {
    id: number;
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    trend: {
      isUp: boolean;
      percentage: string;
      label: string;
    };
    caption?: string;
  }

  interface Transaction {
    id: string;
    name: string;
    description: string;
    amount: string;
    date: string;
    status: 'paid' | 'pending' | 'overdue';
  }

  interface RentPayment {
    id: string;
    residentName: string;
    unit: string;
    amount: string;
    dueDate: string;
    daysLeft: number;
  }

  interface OccupancyData {
    occupiedUnits: number;
    totalUnits: number;
    occupancyPercentage: number;
  }

  interface DashboardContentProps {
    statsData: StatData[];
    occupancyData: OccupancyData;
    transactionsData: Transaction[];
    rentData: RentPayment[];
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Selamat Datang, Admin!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Berikut adalah ringkasan performa bisnis Anda hari ini.
        </Typography>
      </Box>

      {/* Baris pertama: Statistik umum */}
      <Grid container spacing={2} mb={2}>
        {statsData.map((stat) => (
          <Grid key={stat.id} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 2.4 }}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
              caption={stat.caption || ""}
            />
          </Grid>
        ))}

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 2.4 }}>
          <AddDataCard />
        </Grid>
      </Grid>

      {/* Baris kedua: Okupansi dan aksi cepat */}
      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <OccupancyRateCard
            occupiedUnits={occupancyData.occupiedUnits}
            totalUnits={occupancyData.totalUnits}
            occupancyPercentage={occupancyData.occupancyPercentage}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <QuickActionsCard
            onAddResident={handleAddResident}
            onRecordPayment={handleRecordPayment}
            onAddUnit={handleAddUnit}
            onManageLaundry={handleManageLaundry}
          />
        </Grid>
      </Grid>

      {/* Baris ketiga: Transaksi terbaru dan sewa mendatang */}
      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <RecentTransactionsCard transactions={transactionsData} />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <UpcomingRentCard rentPayments={rentData} />
        </Grid>
      </Grid>

      {/* Grafik pendapatan */}
      <Box sx={{ p: 2, mt: 2 }}>
        <RevenueChart />
      </Box>
    </>
  );
}