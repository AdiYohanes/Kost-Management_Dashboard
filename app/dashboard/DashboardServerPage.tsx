import { Grid, Paper, Typography, Box } from "@mui/material";
// Import Ikon-ikon yang diperlukan
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import StatCard from "./components/StatCard";
import AddDataCard from "./components/AddDataCard";
import RevenueChart from "./components/RevenueChart";
import RecentTransactionsCard from "./components/DashboardCards/RecentTransactionsCard";
import OccupancyRateCard from "./components/DashboardCards/OccupancyRateCard";
import UpcomingRentCard from "./components/DashboardCards/UpcomingRentCard";
import QuickActionsCard from "./components/DashboardCards/QuickActionsCard";

const transactionsData = [
  {
    id: "1",
    name: "Budi Santoso",
    description: "Sewa bulan Juni",
    amount: "Rp 1.500.000",
    date: "15 Jun 2023",
    status: "paid" as const,
  },
  {
    id: "2",
    name: "Siti Aminah",
    description: "Sewa bulan Juni",
    amount: "Rp 1.200.000",
    date: "16 Jun 2023",
    status: "pending" as const,
  },
  {
    id: "3",
    name: "Ahmad Fauzi",
    description: "Sewa bulan Juni",
    amount: "Rp 1.800.000",
    date: "10 Jun 2023",
    status: "overdue" as const,
  },
  {
    id: "4",
    name: "Rina Kartika",
    description: "Sewa bulan Juni",
    amount: "Rp 1.400.000",
    date: "12 Jun 2023",
    status: "paid" as const,
  },
  {
    id: "5",
    name: "Dedi Prasetyo",
    description: "Sewa bulan Juni",
    amount: "Rp 1.600.000",
    date: "18 Jun 2023",
    status: "pending" as const,
  },
];

const rentData = [
  {
    id: "1",
    residentName: "Budi Santoso",
    unit: "A-101",
    amount: "Rp 1.500.000",
    dueDate: "5 Jul 2023",
    daysLeft: 3,
  },
  {
    id: "2",
    residentName: "Siti Aminah",
    unit: "B-202",
    amount: "Rp 1.200.000",
    dueDate: "7 Jul 2023",
    daysLeft: 5,
  },
  {
    id: "3",
    residentName: "Ahmad Fauzi",
    unit: "C-301",
    amount: "Rp 1.800.000",
    dueDate: "Today",
    daysLeft: 0,
  },
  {
    id: "4",
    residentName: "Rina Kartika",
    unit: "A-103",
    amount: "Rp 1.400.000",
    dueDate: "3 Jul 2023",
    daysLeft: 1,
  },
  {
    id: "5",
    residentName: "Dedi Prasetyo",
    unit: "D-401",
    amount: "Rp 1.600.000",
    dueDate: "8 Jul 2023",
    daysLeft: 6,
  },
];

export default function DashboardServerPage() {
  // Mock occupancy data
  const occupancyData = {
    occupiedUnits: 42,
    totalUnits: 50,
    occupancyPercentage: 84,
  };

  // Memperbarui statsData dengan ikon yang benar
  const statsDataWithIcons = [
    {
      id: 1,
      title: "Total Pendapatan",
      value: "Rp 15.2M",
      icon: <AttachMoneyIcon />,
      color: "primary",
      trend: { isUp: true, percentage: "+12%", label: "dari bulan lalu" },
    },
    {
      id: 2,
      title: "Total Pengguna",
      value: "1,250",
      caption: "users",
      icon: <GroupIcon />,
      color: "info",
      trend: { isUp: true, percentage: "+5%", label: "minggu ini" },
    },
    {
      id: 3,
      title: "Laundry Pending",
      value: "34",
      caption: "orders",
      icon: <LocalLaundryServiceIcon />,
      color: "warning",
      trend: {
        isUp: false,
        percentage: "-2%",
        label: "lebih sedikit dari kemarin",
      },
    },
    {
      id: 4,
      title: "Unit Kost Kosong",
      value: "3",
      icon: <MeetingRoomIcon />,
      color: "error",
      trend: {
        isUp: true,
        percentage: "+3",
        label: "Kamar tersedia",
      },
    },
  ];

  return (
    <Box sx={{ p: 1, maxWidth: "100vw", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Selamat Datang, Admin!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Berikut adalah ringkasan performa bisnis Anda hari ini.
        </Typography>
      </Box>

      {/* Grid Bento Box */}
      <Grid container spacing={1} sx={{ mb: 1 }}>
        {/* Baris 1: Statistik utama */}
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
          <StatCard
            title={statsDataWithIcons[0].title}
            value={statsDataWithIcons[0].value}
            icon={statsDataWithIcons[0].icon}
            color={statsDataWithIcons[0].color}
            trend={statsDataWithIcons[0].trend}
            caption={statsDataWithIcons[0].caption || ""}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
          <StatCard
            title={statsDataWithIcons[1].title}
            value={statsDataWithIcons[1].value}
            icon={statsDataWithIcons[1].icon}
            color={statsDataWithIcons[1].color}
            trend={statsDataWithIcons[1].trend}
            caption={statsDataWithIcons[1].caption || ""}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
          <StatCard
            title={statsDataWithIcons[2].title}
            value={statsDataWithIcons[2].value}
            icon={statsDataWithIcons[2].icon}
            color={statsDataWithIcons[2].color}
            trend={statsDataWithIcons[2].trend}
            caption={statsDataWithIcons[2].caption || ""}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
          <StatCard
            title={statsDataWithIcons[3].title}
            value={statsDataWithIcons[3].value}
            icon={statsDataWithIcons[3].icon}
            color={statsDataWithIcons[3].color}
            trend={statsDataWithIcons[3].trend}
            caption={statsDataWithIcons[3].caption || ""}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2, lg: 2 }}>
          <AddDataCard />
        </Grid>

        {/* Baris 2: Okupansi dan Total Kamar */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <OccupancyRateCard
            occupiedUnits={occupancyData.occupiedUnits}
            totalUnits={occupancyData.totalUnits}
            occupancyPercentage={occupancyData.occupancyPercentage}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <QuickActionsCard />
        </Grid>

        {/* Baris 3: Transaksi Terbaru dan Sewa Mendatang */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <RecentTransactionsCard transactions={transactionsData} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <UpcomingRentCard rentPayments={rentData} />
        </Grid>

        {/* Grafik Pendapatan (lebar penuh) */}
        <Grid size={{ xs: 12 }}>
          <RevenueChart />
        </Grid>
      </Grid>
    </Box>
  );
}