"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
  IconButton,
  Menu,
  MenuItem as MuiMenuItem,
  Divider,
  useTheme,
  alpha,
  Stack,
  InputAdornment,
  Pagination,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  LocalLaundryService as LaundryIcon,
} from "@mui/icons-material";

type LaundryStatus = "washing" | "completed" | "ready_for_pickup" | "new";
type PaymentStatus = "paid" | "unpaid";

interface LaundryItem {
  id: string;
  customerName: string;
  customerPhone: string;
  unitNumber: string;
  serviceType: string;
  weight: number;
  totalAmount: number;
  paidAmount: number;
  status: LaundryStatus;
  createdAt: string;
  estimatedCompletion: string;
}

// Sample data for demonstration
const initialData: LaundryItem[] = [
  {
    id: "L001",
    customerName: "Budi Santoso",
    customerPhone: "081234567890",
    unitNumber: "A-101",
    serviceType: "Cuci Setrika",
    weight: 3,
    totalAmount: 45000,
    paidAmount: 45000,
    status: "ready_for_pickup",
    createdAt: "2024-01-15",
    estimatedCompletion: "2024-01-17",
  },
  {
    id: "L002",
    customerName: "Siti Nurhaliza",
    customerPhone: "081234567891",
    unitNumber: "A-103",
    serviceType: "Cuci Kering",
    weight: 2.5,
    totalAmount: 25000,
    paidAmount: 25000,
    status: "completed",
    createdAt: "2024-01-15",
    estimatedCompletion: "2024-01-16",
  },
  {
    id: "L003",
    customerName: "Ahmad Fauzi",
    customerPhone: "081234567892",
    unitNumber: "A-201",
    serviceType: "Setrika Saja",
    weight: 2,
    totalAmount: 20000,
    paidAmount: 10000,
    status: "washing",
    createdAt: "2024-01-16",
    estimatedCompletion: "2024-01-17",
  },
  {
    id: "L004",
    customerName: "Dewi Kartika",
    customerPhone: "081234567893",
    unitNumber: "B-201",
    serviceType: "VIP Service",
    weight: 4,
    totalAmount: 80000,
    paidAmount: 80000,
    status: "washing",
    createdAt: "2024-01-16",
    estimatedCompletion: "2024-01-18",
  },
  {
    id: "L005",
    customerName: "Rina Kusuma",
    customerPhone: "081234567894",
    unitNumber: "B-202",
    serviceType: "Cuci Setrika",
    weight: 1.5,
    totalAmount: 22500,
    paidAmount: 0,
    status: "new",
    createdAt: "2024-01-17",
    estimatedCompletion: "2024-01-19",
  },
  {
    id: "L006",
    customerName: "Joko Widodo",
    customerPhone: "081234567895",
    unitNumber: "C-301",
    serviceType: "Cuci Setrika",
    weight: 2.5,
    totalAmount: 30000,
    paidAmount: 30000,
    status: "ready_for_pickup",
    createdAt: "2024-01-14",
    estimatedCompletion: "2024-01-16",
  },
  {
    id: "L007",
    customerName: "Mega Pratiwi",
    customerPhone: "081234567896",
    unitNumber: "D-401",
    serviceType: "Setrika Saja",
    weight: 1.2,
    totalAmount: 12000,
    paidAmount: 0,
    status: "ready_for_pickup", // Ready for pickup but not paid
    createdAt: "2024-01-15",
    estimatedCompletion: "2024-01-17",
  },
];

const statusLabels = {
  new: { label: "Baru", color: "info", icon: "🆕" },
  washing: { label: "Dalam Proses", color: "info", icon: "🧺" },
  completed: { label: "Selesai", color: "success", icon: "✅" },
  ready_for_pickup: { label: "Siap Diambil", color: "warning", icon: "📦" },
};

const statusColors = {
  new: { bg: "#E3F2FD", text: "#1976D2" },            // Blue
  washing: { bg: "#FFF3E0", text: "#F57C00" },        // Orange
  completed: { bg: "#E8F5E9", text: "#388E3C" },      // Green
  ready_for_pickup: { bg: "#FCE4EC", text: "#E91E63" }, // Pink/Red
};

const getPaymentStatus = (item: LaundryItem): PaymentStatus => {
  return item.paidAmount >= item.totalAmount ? "paid" : "unpaid";
};

const getPaymentStatusColor = (paymentStatus: PaymentStatus) => {
  switch (paymentStatus) {
    case "paid":
      return { bgcolor: "#e8f5e9", color: "#2e7d32" }; // hijau muda
    case "unpaid":
      return { bgcolor: "#ffebee", color: "#c62828" }; // merah muda
    default:
      return { bgcolor: "#f5f5f5", color: "#616161" };
  }
};

export default function LaundryManagement() {
  const [laundryData, setLaundryData] = useState<LaundryItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<LaundryItem> | null>(null);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<LaundryItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Jumlah item per halaman
  const theme = useTheme();

  useEffect(() => {
    // In a real app, this would come from an API call
    setLaundryData(initialData);
  }, []);

  const handleOpenAdd = () => {
    setCurrentItem({
      customerName: "",
      customerPhone: "",
      unitNumber: "",
      serviceType: "",
      weight: 1,
      totalAmount: 0,
      paidAmount: 0,
      status: "new",
      createdAt: new Date().toISOString().split("T")[0],
      estimatedCompletion: new Date().toISOString().split("T")[0],
    });
    setDialogMode("add");
    setError("");
    setOpenDialog(true);
  };

  const handleOpenEdit = (item: LaundryItem) => {
    setCurrentItem({ ...item });
    setDialogMode("edit");
    setError("");
    setOpenDialog(true);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: LaundryItem) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleSave = () => {
    if (!currentItem) return;

    let newError = "";
    if (!currentItem.customerName?.trim()) newError = "Nama pelanggan wajib diisi";
    if (!currentItem.customerPhone?.trim()) newError = "Nomor telepon wajib diisi";
    if (!currentItem.unitNumber?.trim()) newError = "Nomor unit wajib diisi";
    if (!currentItem.serviceType?.trim()) newError = "Jenis layanan wajib diisi";
    if ((currentItem.weight || 0) <= 0) newError = "Berat harus lebih dari 0";
    if ((currentItem.totalAmount || 0) < (currentItem.paidAmount || 0)) {
      newError = "Jumlah pembayaran tidak boleh melebihi total tagihan";
    }
    if (currentItem.status === "ready_for_pickup" && (currentItem.paidAmount || 0) < (currentItem.totalAmount || 0)) {
      newError = "Pembayaran harus lunas sebelum laundry siap diambil";
    }

    if (newError) {
      setError(newError);
      return;
    }

    if (dialogMode === "add") {
      const newItem: LaundryItem = {
        id: `L${String(laundryData.length + 1).padStart(3, "0")}`,
        customerName: currentItem.customerName || "",
        customerPhone: currentItem.customerPhone || "",
        unitNumber: currentItem.unitNumber || "",
        serviceType: currentItem.serviceType || "",
        weight: currentItem.weight || 0,
        totalAmount: currentItem.totalAmount || 0,
        paidAmount: currentItem.paidAmount || 0,
        status: currentItem.status as LaundryStatus || "new",
        createdAt: currentItem.createdAt || new Date().toISOString().split("T")[0],
        estimatedCompletion: currentItem.estimatedCompletion || new Date().toISOString().split("T")[0],
      };
      setLaundryData([...laundryData, newItem]);
    } else {
      setLaundryData(
        laundryData.map((item) =>
          item.id === currentItem.id
            ? { ...currentItem, id: currentItem.id! } as LaundryItem
            : item
        )
      );
    }

    setOpenDialog(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data laundry ini?")) {
      setLaundryData(laundryData.filter((item) => item.id !== id));
    }
    handleMenuClose();
  };

  const handleStatusChange = (id: string, status: LaundryStatus) => {
    setLaundryData(
      laundryData.map((item) =>
        item.id === id
          ? { ...item, status }
          : item
      )
    );
    handleMenuClose();
  };

  const handleInputChange = (field: keyof LaundryItem, value: string | number) => {
    if (!currentItem) return;
    setCurrentItem({
      ...currentItem,
      [field]: value,
    });
  };

  const handleStatusChangeInForm = (event: SelectChangeEvent<LaundryStatus>) => {
    const status = event.target.value as LaundryStatus;
    handleInputChange("status", status);
  };

  // Filter data berdasarkan pencarian
  const filteredData = laundryData.filter(item => {
    return (
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerPhone.includes(searchTerm) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Logika pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusChip = (status: LaundryStatus) => {
    const statusInfo = statusLabels[status];
    return (
      <Chip
        icon={<span style={{ fontSize: '1rem' }}>{statusInfo.icon}</span>}
        label={statusInfo.label}
        size="small"
        variant="filled"
        sx={{
          backgroundColor: statusColors[status].text,
          color: 'white',
          fontWeight: 600,
          borderRadius: '8px',
          fontSize: "0.75rem",
          height: "24px",
        }}
      />
    );
  };

  const getPaymentStatusChip = (item: LaundryItem) => {
    const isPaid = getPaymentStatus(item) === "paid";
    const paymentStatus = getPaymentStatus(item);
    return (
      <Chip
        icon={isPaid ? <CheckCircleIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
        label={isPaid ? "Lunas" : "Belum Lunas"}
        size="small"
        variant="filled"
        sx={{
          ...getPaymentStatusColor(paymentStatus),
          fontWeight: 600,
          fontSize: "0.75rem",
          height: "24px",
          borderRadius: 1
        }}
      />
    );
  };

  // Calculate card values
  const newLaundryCount = laundryData.filter(item => item.status === 'new').length;
  const washingCount = laundryData.filter(item => item.status === 'washing').length;
  const completedCount = laundryData.filter(item => item.status === 'completed').length;
  const readyForPickupCount = laundryData.filter(item => item.status === 'ready_for_pickup').length;
  const paidCount = laundryData.filter(item => getPaymentStatus(item) === 'paid').length;
  const unpaidCount = laundryData.filter(item => getPaymentStatus(item) === 'unpaid').length;

  return (
    <Box sx={{ p: 3, maxWidth: "100vw", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom color="text.primary">
          Laundry Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kelola layanan laundry dengan sistem yang modern dan efisien
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
            {newLaundryCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Laundry Baru
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
            {washingCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Dalam Proses
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
          <Typography variant="h5" color="#388E3C" fontWeight={700}>
            {completedCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Selesai
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
          <Typography variant="h5" color="#E91E63" fontWeight={700}>
            {readyForPickupCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Siap Diambil
          </Typography>
        </Paper>
      </Box>

      {/* Payment Status Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 4 }}>
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
            {paidCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Pembayaran Lunas
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
            {unpaidCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Pembayaran Belum Lunas
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
          placeholder="Cari laundry, pelanggan, unit, layanan..."
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

      {/* Action Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 3
            }
          }}
        >
          Tambah Laundry Baru
        </Button>
      </Box>

      {/* Table */}
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
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Pelanggan</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Unit Kost</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Layanan</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Total (Rp)</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Dibayar (Rp)</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Pembayaran</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }} align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { bgcolor: 'grey.50' }
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="body2" fontWeight={600} color="primary.main">
                      {item.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="text.primary">
                      {item.customerName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.customerPhone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.primary">{item.unitNumber}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.primary">
                      {item.serviceType}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.weight} kg • {item.createdAt} s/d {item.estimatedCompletion}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="success.main" fontWeight={600}>
                      {item.totalAmount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="info.main" fontWeight={600}>
                      {item.paidAmount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {getStatusChip(item.status)}
                  </TableCell>
                  <TableCell>
                    {getPaymentStatusChip(item)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={(event) => handleMenuOpen(event, item)}
                      size="small"
                      sx={{
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.action.hover, 0.1)
                        }
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedItem?.id === item.id}
                      onClose={handleMenuClose}
                      PaperProps={{
                        elevation: 2,
                        sx: { borderRadius: 2 }
                      }}
                    >
                      <MuiMenuItem
                        onClick={() => handleOpenEdit(item)}
                        disabled={item.status === "ready_for_pickup" && item.paidAmount < item.totalAmount}
                        sx={{
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04)
                          }
                        }}
                      >
                        <EditIcon sx={{ mr: 1, fontSize: 16 }} />
                        Edit
                      </MuiMenuItem>

                      <MuiMenuItem
                        onClick={() => handleStatusChange(item.id, "ready_for_pickup")}
                        disabled={item.paidAmount < item.totalAmount || item.status === "ready_for_pickup"}
                        sx={{
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.warning.main, 0.04)
                          }
                        }}
                      >
                        <CheckCircleIcon sx={{ mr: 1, fontSize: 16 }} />
                        Siap Ambil
                      </MuiMenuItem>

                      <Divider />

                      <MuiMenuItem
                        onClick={() => handleDelete(item.id)}
                        sx={{
                          color: theme.palette.error.main,
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.error.main, 0.04)
                          }
                        }}
                      >
                        <DeleteIcon sx={{ mr: 1, fontSize: 16 }} />
                        Hapus
                      </MuiMenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <LaundryIcon sx={{ fontSize: 60, color: 'action.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Tidak ada data laundry
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mulai dengan menambahkan laundry baru untuk melihat data di sini
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination with total count */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Menampilkan {paginatedData.length} dari {filteredData.length} laundry
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

      {/* Dialog for adding/editing laundry */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            fontWeight: 600,
            background: alpha(theme.palette.primary.main, 0.04),
            py: 2
          }}
        >
          {dialogMode === "add" ? "Tambah Laundry Baru" : "Edit Laundry"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Nama Pelanggan"
                variant="outlined"
                value={currentItem?.customerName || ""}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                required
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Nomor Telepon"
                variant="outlined"
                value={currentItem?.customerPhone || ""}
                onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                required
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Nomor Unit Kost"
                variant="outlined"
                value={currentItem?.unitNumber || ""}
                onChange={(e) => handleInputChange("unitNumber", e.target.value)}
                required
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Jenis Layanan"
                variant="outlined"
                value={currentItem?.serviceType || ""}
                onChange={(e) => handleInputChange("serviceType", e.target.value)}
                required
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Berat (kg)"
                variant="outlined"
                type="number"
                value={currentItem?.weight || ""}
                onChange={(e) => handleInputChange("weight", parseFloat(e.target.value) || 0)}
                required
                inputProps={{ min: 0.1, step: 0.1 }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Total Tagihan"
                variant="outlined"
                type="number"
                value={currentItem?.totalAmount || ""}
                onChange={(e) => handleInputChange("totalAmount", parseInt(e.target.value) || 0)}
                required
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Jumlah Dibayar"
                variant="outlined"
                type="number"
                value={currentItem?.paidAmount || ""}
                onChange={(e) => handleInputChange("paidAmount", parseInt(e.target.value) || 0)}
                required
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Tanggal Masuk"
                variant="outlined"
                type="date"
                value={currentItem?.createdAt || ""}
                onChange={(e) => handleInputChange("createdAt", e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Estimasi Selesai"
                variant="outlined"
                type="date"
                value={currentItem?.estimatedCompletion || ""}
                onChange={(e) => handleInputChange("estimatedCompletion", e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={currentItem?.status || "new"}
                  label="Status"
                  onChange={handleStatusChangeInForm}
                >
                  <MenuItem value="new">Baru</MenuItem>
                  <MenuItem value="washing">Dalam Proses</MenuItem>
                  <MenuItem value="completed">Selesai</MenuItem>
                  <MenuItem value="ready_for_pickup">Siap Diambil</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Batal
          </Button>
          <Button onClick={handleSave} variant="contained">
            {dialogMode === "add" ? "Tambah" : "Simpan"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}