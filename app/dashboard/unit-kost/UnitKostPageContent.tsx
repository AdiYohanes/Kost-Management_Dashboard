"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  Pagination,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Interface untuk data unit kost
interface UnitKost {
  id: string;
  unitNumber: string;
  floor: string;
  roomType: string;
  size: string; // dalam meter persegi
  monthlyRate: string;
  tenantName: string | null;
  status: "empty" | "occupied" | "booked" | "maintenance";
  bookingExpiration: string | null; // tanggal kadaluarsa booking
  leaseStart: string | null;
  leaseEnd: string | null;
  amenities: string[]; // fasilitas
  lastPaymentDate: string | null;
  monthlyPaymentStatus: "paid" | "pending" | "overdue";
}

// Data dummy untuk unit kost
const dummyUnitKostData: UnitKost[] = [
  {
    id: "1",
    unitNumber: "A-101",
    floor: "1",
    roomType: "Standard",
    size: "18 m²",
    monthlyRate: "Rp 1.500.000",
    tenantName: "Budi Santoso",
    status: "occupied",
    bookingExpiration: null,
    leaseStart: "2023-06-01",
    leaseEnd: "2024-06-01",
    amenities: ["AC", "WiFi", "Kasur", "Lemari"],
    lastPaymentDate: "2023-11-15",
    monthlyPaymentStatus: "paid",
  },
  {
    id: "2",
    unitNumber: "A-102",
    floor: "1",
    roomType: "Deluxe",
    size: "22 m²",
    monthlyRate: "Rp 1.800.000",
    tenantName: null,
    status: "booked",
    bookingExpiration: "2023-12-15",
    leaseStart: null,
    leaseEnd: null,
    amenities: ["AC", "WiFi", "Kasur", "Lemari", "TV"],
    lastPaymentDate: null,
    monthlyPaymentStatus: "pending",
  },
  {
    id: "3",
    unitNumber: "A-103",
    floor: "1",
    roomType: "Standard",
    size: "16 m²",
    monthlyRate: "Rp 1.200.000",
    tenantName: "Siti Aminah",
    status: "occupied",
    bookingExpiration: null,
    leaseStart: "2023-05-01",
    leaseEnd: "2024-05-01",
    amenities: ["WiFi", "Kasur", "Lemari"],
    lastPaymentDate: "2023-11-10",
    monthlyPaymentStatus: "paid",
  },
  {
    id: "4",
    unitNumber: "B-201",
    floor: "2",
    roomType: "Premium",
    size: "25 m²",
    monthlyRate: "Rp 2.200.000",
    tenantName: null,
    status: "empty",
    bookingExpiration: null,
    leaseStart: null,
    leaseEnd: null,
    amenities: ["AC", "WiFi", "Kasur", "Lemari", "TV", "Kulkas"],
    lastPaymentDate: null,
    monthlyPaymentStatus: "pending",
  },
  {
    id: "5",
    unitNumber: "B-202",
    floor: "2",
    roomType: "Standard",
    size: "17 m²",
    monthlyRate: "Rp 1.300.000",
    tenantName: "Ahmad Fauzi",
    status: "occupied",
    bookingExpiration: null,
    leaseStart: "2023-07-01",
    leaseEnd: "2024-07-01",
    amenities: ["AC", "WiFi", "Kasur", "Lemari"],
    lastPaymentDate: "2023-11-12",
    monthlyPaymentStatus: "overdue",
  },
  {
    id: "6",
    unitNumber: "C-301",
    floor: "3",
    roomType: "Deluxe",
    size: "23 m²",
    monthlyRate: "Rp 2.000.000",
    tenantName: null,
    status: "maintenance",
    bookingExpiration: null,
    leaseStart: null,
    leaseEnd: null,
    amenities: ["AC", "WiFi", "Kasur", "Lemari", "TV"],
    lastPaymentDate: null,
    monthlyPaymentStatus: "pending",
  },
  {
    id: "7",
    unitNumber: "C-302",
    floor: "3",
    roomType: "Premium",
    size: "28 m²",
    monthlyRate: "Rp 2.500.000",
    tenantName: "Rina Kartika",
    status: "occupied",
    bookingExpiration: null,
    leaseStart: "2023-09-01",
    leaseEnd: "2024-09-01",
    amenities: ["AC", "WiFi", "Kasur", "Lemari", "TV", "Kulkas", "Dapur Mini"],
    lastPaymentDate: "2023-11-05",
    monthlyPaymentStatus: "paid",
  },
  {
    id: "8",
    unitNumber: "D-401",
    floor: "4",
    roomType: "VIP",
    size: "35 m²",
    monthlyRate: "Rp 3.500.000",
    tenantName: null,
    status: "empty",
    bookingExpiration: null,
    leaseStart: null,
    leaseEnd: null,
    amenities: ["AC", "WiFi", "Kasur", "Lemari", "TV", "Kulkas", "Dapur Mini", "Kamar Mandi Dalam"],
    lastPaymentDate: null,
    monthlyPaymentStatus: "pending",
  },
];

export default function UnitKostPageContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Jumlah item per halaman

  // Filter data berdasarkan pencarian
  const filteredUnits = dummyUnitKostData.filter(unit =>
    unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (unit.tenantName && unit.tenantName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    unit.roomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.floor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logika pagination
  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUnits = filteredUnits.slice(startIndex, startIndex + itemsPerPage);

  // Fungsi untuk mendapatkan warna berdasarkan status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return { bgcolor: "#e8f5e9", color: "#2e7d32" }; // hijau muda
      case "empty":
        return { bgcolor: "#ffebee", color: "#c62828" }; // merah muda
      case "booked":
        return { bgcolor: "#fff3e0", color: "#ef6c00" }; // oranye muda
      case "maintenance":
        return { bgcolor: "#e3f2fd", color: "#1565c0" }; // biru muda
      default:
        return { bgcolor: "#f5f5f5", color: "#616161" };
    }
  };

  // Fungsi untuk mendapatkan warna status pembayaran
  const getPaymentStatusColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "paid":
        return { bgcolor: "#e8f5e9", color: "#2e7d32" }; // hijau muda
      case "pending":
        return { bgcolor: "#fff3e0", color: "#ef6c00" }; // oranye muda
      case "overdue":
        return { bgcolor: "#ffebee", color: "#c62828" }; // merah muda
      default:
        return { bgcolor: "#f5f5f5", color: "#616161" };
    }
  };

  return (
    <Box sx={{ p: 1, maxWidth: "100vw", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Unit Kost
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Kelola unit-unit kost Anda di sini
        </Typography>
      </Box>

      {/* Search Bar */}
      <Paper 
        sx={{ 
          p: 1.5, 
          mb: 2, 
          bgcolor: "white", 
          borderRadius: 2, 
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)" 
        }}
      >
        <TextField
          fullWidth
          placeholder="Cari unit kost, penghuni, tipe kamar..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset ke halaman pertama saat pencarian
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ bgcolor: "background.paper" }}
        />
      </Paper>

      {/* Tabel Unit Kost */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          bgcolor: "white", 
          borderRadius: 2, 
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          overflow: "hidden"
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Unit</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Lantai</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Tipe Kamar</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Ukuran</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Tarif/Bulan</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Penghuni</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Kadaluarsa Booking</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Status Pembayaran</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUnits.map((unit) => (
              <TableRow 
                key={unit.id} 
                hover
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="body2" fontWeight={600}>
                    {unit.unitNumber}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{unit.floor}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{unit.roomType}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{unit.size}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="primary.main" fontWeight={600}>
                    {unit.monthlyRate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body2" 
                    color={unit.tenantName ? "text.primary" : "text.disabled"}
                  >
                    {unit.tenantName || "Kosong"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={
                      unit.status === "occupied" ? "Terisi" :
                      unit.status === "empty" ? "Kosong" :
                      unit.status === "booked" ? "Dipesan" : "Perawatan"
                    }
                    size="small"
                    variant="outlined"
                    sx={{
                      ...getStatusColor(unit.status),
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      height: "24px"
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body2" 
                    color={unit.bookingExpiration ? "text.primary" : "text.disabled"}
                  >
                    {unit.bookingExpiration || "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={
                      unit.monthlyPaymentStatus === "paid" ? "Lunas" :
                      unit.monthlyPaymentStatus === "pending" ? "Pending" :
                      "Terlambat"
                    }
                    size="small"
                    variant="outlined"
                    sx={{
                      ...getPaymentStatusColor(unit.monthlyPaymentStatus),
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      height: "24px"
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
            size="medium"
          />
        </Stack>
      )}

      {/* Info ringkasan */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Paper 
          sx={{ 
            p: 2, 
            flex: 1, 
            bgcolor: '#e8f5e9', 
            borderLeft: '4px solid #4caf50',
            minWidth: '200px'
          }}
        >
          <Typography variant="h6" color="#2e7d32" fontWeight={600}>
            {dummyUnitKostData.filter(u => u.status === 'occupied').length}
          </Typography>
          <Typography variant="body2" color="#1b5e20">
            Unit Terisi
          </Typography>
        </Paper>
        
        <Paper 
          sx={{ 
            p: 2, 
            flex: 1, 
            bgcolor: '#ffebee', 
            borderLeft: '4px solid #f44336',
            minWidth: '200px'
          }}
        >
          <Typography variant="h6" color="#c62828" fontWeight={600}>
            {dummyUnitKostData.filter(u => u.status === 'empty').length}
          </Typography>
          <Typography variant="body2" color="#b71c1c">
            Unit Kosong
          </Typography>
        </Paper>
        
        <Paper 
          sx={{ 
            p: 2, 
            flex: 1, 
            bgcolor: '#fff3e0', 
            borderLeft: '4px solid #ff9800',
            minWidth: '200px'
          }}
        >
          <Typography variant="h6" color="#ef6c00" fontWeight={600}>
            {dummyUnitKostData.filter(u => u.status === 'booked').length}
          </Typography>
          <Typography variant="body2" color="#e65100">
            Unit Dipesan
          </Typography>
        </Paper>
        
        <Paper 
          sx={{ 
            p: 2, 
            flex: 1, 
            bgcolor: '#e3f2fd', 
            borderLeft: '4px solid #2196f3',
            minWidth: '200px'
          }}
        >
          <Typography variant="h6" color="#1565c0" fontWeight={600}>
            {dummyUnitKostData.filter(u => u.status === 'maintenance').length}
          </Typography>
          <Typography variant="body2" color="#0d47a1">
            Unit Perawatan
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}