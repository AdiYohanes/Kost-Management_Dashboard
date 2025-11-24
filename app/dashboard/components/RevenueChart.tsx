"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";

// Format angka ke Rupiah
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
};

interface TooltipPayload {
  name: string;
  value: number;
  stroke: string;
  // payload?: any; // Uncomment jika butuh akses data asli (income/expense objects)
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

// Tooltip custom saat hover di chart
function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        backgroundColor: "white",
        border: "1px solid #e5e7eb",
        minWidth: 160,
      }}
    >
      <Typography variant="body2" color="text.secondary" mb={1}>
        {label}
      </Typography>
      {payload.map((item, index) => (
        <Box
          key={index}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          mb={0.5}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: item.stroke,
              }}
            />
            <Typography variant="body2" fontWeight={500}>
              {item.name}
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight={700}>
            {formatRupiah(item.value)}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
}

// Data dummy - mingguan
const dataMingguan = [
  { label: "Sen", income: 5500000, expense: 3200000 },
  { label: "Sel", income: 7300000, expense: 4100000 },
  { label: "Rab", income: 6400000, expense: 3800000 },
  { label: "Kam", income: 8900000, expense: 5100000 },
  { label: "Jum", income: 12500000, expense: 7200000 },
  { label: "Sab", income: 14100000, expense: 8800000 },
  { label: "Min", income: 10800000, expense: 6500000 },
];

// Data dummy - bulanan
const dataBulanan = [
  { label: "Jan", income: 45000000, expense: 24000000 },
  { label: "Feb", income: 38000000, expense: 28000000 },
  { label: "Mar", income: 52000000, expense: 35000000 },
  { label: "Apr", income: 48000000, expense: 39000000 },
  { label: "Mei", income: 61000000, expense: 42000000 },
  { label: "Jun", income: 58000000, expense: 38000000 },
  { label: "Jul", income: 65000000, expense: 45000000 },
  { label: "Ags", income: 72000000, expense: 51000000 },
  { label: "Sep", income: 68000000, expense: 49000000 },
  { label: "Okt", income: 85000000, expense: 55000000 },
  { label: "Nov", income: 79000000, expense: 52000000 },
  { label: "Des", income: 95000000, expense: 60000000 },
];

export default function RevenueChart() {
  const [periode, setPeriode] = useState("bulan");

  const dataChart = periode === "minggu" ? dataMingguan : dataBulanan;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid #e5e7eb",
        background: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={3}
      >
        <Box>
          <Typography variant="h6" fontWeight={700} color="text.primary">
            Grafik Pendapatan
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Perbandingan pendapatan dan pengeluaran
          </Typography>
        </Box>

        {/* Toggle button minggu/bulan */}
        <Stack direction="row" spacing={1}>
          <Button
            onClick={() => setPeriode("minggu")}
            variant={periode === "minggu" ? "contained" : "outlined"}
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              bgcolor: periode === "minggu" ? 'primary.main' : 'transparent',
              color: periode === "minggu" ? 'white' : 'text.primary',
              border: periode === "minggu" ? 'none' : '1px solid',
              borderColor: periode === "minggu" ? 'transparent' : 'divider'
            }}
          >
            Mingguan
          </Button>
          <Button
            onClick={() => setPeriode("bulan")}
            variant={periode === "bulan" ? "contained" : "outlined"}
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              bgcolor: periode === "bulan" ? 'primary.main' : 'transparent',
              color: periode === "bulan" ? 'white' : 'text.primary',
              border: periode === "bulan" ? 'none' : '1px solid',
              borderColor: periode === "bulan" ? 'transparent' : 'divider'
            }}
          >
            Bulanan
          </Button>
        </Stack>
      </Box>

      {/* Chart */}
      <Box sx={{ height: 350, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataChart}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            {/* Grid background */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />

            {/* Sumbu X (horizontal) */}
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />

            {/* Sumbu Y (vertical) */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickFormatter={formatRupiah}
            />

            {/* Tooltip saat hover */}
            <Tooltip content={<CustomTooltip />} />

            {/* Garis Pendapatan (biru) */}
            <Line
              type="monotone"
              dataKey="income"
              name="Pendapatan"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#3b82f6" }}
            />

            {/* Garis Pengeluaran (merah) */}
            <Line
              type="monotone"
              dataKey="expense"
              name="Pengeluaran"
              stroke="#ef4444"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#ef4444" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Legend manual (lebih simple) */}
      <Box display="flex" justifyContent="center" gap={3} mt={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#3b82f6",
            }}
          />
          <Typography variant="body2" fontWeight={500}>
            Pendapatan
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "#ef4444",
            }}
          />
          <Typography variant="body2" fontWeight={500}>
            Pengeluaran
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
