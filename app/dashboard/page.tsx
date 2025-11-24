import { Grid, Paper, Typography, Box, Stack, Avatar } from "@mui/material";
// Import Ikon-ikon yang diperlukan
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupIcon from "@mui/icons-material/Group";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import StatCard from "./components/StatCard";
import AddDataCard from "./components/AddDataCard";
import RevenueChart from "./components/RevenueChart";
import { createDashboardMetadata } from "@/utils/metadata";

export const metadata = createDashboardMetadata({
  subtitle: "Analytics",
  description: "Analytics Dashboard",
});
const statsData = [
  {
    id: 1,
    title: "Total Pendapatan",
    value: "Rp 15.2M",
    icon: <AttachMoneyIcon />,
    color: "primary", // Merujuk ke theme.palette.primary
    trend: { isUp: true, percentage: "+12%", label: "dari bulan lalu" },
  },
  {
    id: 2,
    title: "Total Pengguna",
    value: "1,250",
    caption: "users",
    icon: <GroupIcon />,
    color: "info", // Merujuk ke theme.palette.info (biasanya biru muda)
    trend: { isUp: true, percentage: "+5%", label: "minggu ini" },
  },
  {
    id: 3,
    title: "Laundry Pending",
    value: "34",
    caption: "orders",
    icon: <LocalLaundryServiceIcon />,
    color: "warning", // Oranye/Kuning untuk status tertunda
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

// --- 3. HALAMAN UTAMA ---
export default function DashboardPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Selamat Datang, Admin!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Berikut adalah ringkasan performa bisnis Anda hari ini.
        </Typography>
      </Box>

      {/* Grid Container */}
      <Grid container spacing={3}>
        {statsData.map((stat) => (
          <Grid key={stat.id} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
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

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <AddDataCard />
        </Grid>
      </Grid>
      <Box sx={{ p: 3 }}>
        <RevenueChart />
      </Box>
    </Box>
  );
}
