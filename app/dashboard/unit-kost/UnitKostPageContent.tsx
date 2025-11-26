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
    <Box sx={{ p: 3, maxWidth: "100vw", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom color="text.primary">
          Unit Kost
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kelola dan pantau unit-unit kost Anda secara efisien
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            bgcolor: 'white',
            borderRadius: 3,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
          }}
        >
          <Typography variant="h5" color="#2e7d32" fontWeight={700}>
            {dummyUnitKostData.filter(u => u.status === 'occupied').length}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Unit Terisi
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            bgcolor: 'white',
            borderRadius: 3,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
          }}
        >
          <Typography variant="h5" color="#c62828" fontWeight={700}>
            {dummyUnitKostData.filter(u => u.status === 'empty').length}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Unit Kosong
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            bgcolor: 'white',
            borderRadius: 3,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
          }}
        >
          <Typography variant="h5" color="#ef6c00" fontWeight={700}>
            {dummyUnitKostData.filter(u => u.status === 'booked').length}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Unit Dipesan
          </Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            bgcolor: 'white',
            borderRadius: 3,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
          }}
        >
          <Typography variant="h5" color="#1565c0" fontWeight={700}>
            {dummyUnitKostData.filter(u => u.status === 'maintenance').length}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Unit Perawatan
          </Typography>
        </Paper>
      </Box>

      {/* Search Bar */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0'
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
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />
      </Paper>

      {/* Tabel Unit Kost */}
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0',
          overflow: "hidden"
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Unit</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Lantai</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Tipe Kamar</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Ukuran</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Tarif/Bulan</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Penghuni</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Kadaluarsa Booking</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Status Pembayaran</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUnits.map((unit) => (
              <TableRow
                key={unit.id}
                hover
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { bgcolor: 'grey.50' }
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="body2" fontWeight={600} color="primary.main">
                    {unit.unitNumber}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.primary">{unit.floor}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.primary">{unit.roomType}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.primary">{unit.size}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="success.main" fontWeight={600}>
                    {unit.monthlyRate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color={unit.tenantName ? "text.primary" : "text.secondary"}
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
                    variant="filled"
                    sx={{
                      ...getStatusColor(unit.status),
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      height: "24px",
                      borderRadius: 1
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color={unit.bookingExpiration ? "text.primary" : "text.secondary"}
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
                    variant="filled"
                    sx={{
                      ...getPaymentStatusColor(unit.monthlyPaymentStatus),
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      height: "24px",
                      borderRadius: 1
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination with total count */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Menampilkan {paginatedUnits.length} dari {filteredUnits.length} unit
        </Typography>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 1
              }
            }}
          />
        )}
      </Stack>
    </Box>
  );
}