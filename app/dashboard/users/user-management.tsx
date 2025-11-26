"use client";

import { useState, useEffect } from "react";
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
  InputAdornment,
  Stack,
  Pagination,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

type UserRole = "admin" | "anak_kost";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: "active" | "inactive";
  createdAt: string;
  unitNumber?: string; // Hanya untuk anak kost
}

// Sample data for demonstration
const initialData: User[] = [
  {
    id: "U001",
    name: "Admin Utama",
    email: "admin@kost.com",
    phone: "081234567890",
    role: "admin",
    status: "active",
    createdAt: "2023-01-15",
  },
  {
    id: "U002",
    name: "Budi Santoso",
    email: "budi@example.com",
    phone: "081234567891",
    role: "anak_kost",
    status: "active",
    createdAt: "2023-06-01",
    unitNumber: "A-101",
  },
  {
    id: "U003",
    name: "Siti Nurhaliza",
    email: "siti@example.com",
    phone: "081234567892",
    role: "anak_kost",
    status: "active",
    createdAt: "2023-07-15",
    unitNumber: "A-102",
  },
  {
    id: "U004",
    name: "Ahmad Fauzi",
    email: "ahmad@example.com",
    phone: "081234567893",
    role: "anak_kost",
    status: "active",
    createdAt: "2023-08-20",
    unitNumber: "B-201",
  },
  {
    id: "U005",
    name: "Dewi Kartika",
    email: "dewi@example.com",
    phone: "081234567894",
    role: "anak_kost",
    status: "inactive",
    createdAt: "2023-09-10",
    unitNumber: "C-301",
  },
  {
    id: "U006",
    name: "Rina Kusuma",
    email: "rina@example.com",
    phone: "081234567895",
    role: "anak_kost",
    status: "active",
    createdAt: "2023-10-05",
    unitNumber: "B-202",
  },
  {
    id: "U007",
    name: "Secondary Admin",
    email: "admin2@kost.com",
    phone: "081234567896",
    role: "admin",
    status: "active",
    createdAt: "2023-11-12",
  },
  {
    id: "U008",
    name: "Rizky Pratama",
    email: "rizky@example.com",
    phone: "081234567897",
    role: "anak_kost",
    status: "active",
    createdAt: "2023-12-01",
    unitNumber: "D-401",
  },
];

const roleLabels = {
  admin: { label: "Admin", color: "primary", icon: "👑" },
  anak_kost: { label: "Anak Kost", color: "secondary", icon: "🏠" },
};

const roleColors = {
  admin: { bg: "#E3F2FD", text: "#1976D2" },      // Blue
  anak_kost: { bg: "#F3E5F5", text: "#7B1FA2" },  // Purple
};

const statusColors = {
  active: { bg: "#E8F5E9", text: "#388E3C" },      // Green
  inactive: { bg: "#FFEBEE", text: "#C62828" },    // Red
};

export default function UserManagement() {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<User> | null>(null);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Jumlah item per halaman
  const theme = useTheme();

  useEffect(() => {
    // In a real app, this would come from an API call
    setUsersData(initialData);
  }, []);

  const handleOpenAdd = () => {
    setCurrentItem({
      name: "",
      email: "",
      phone: "",
      role: "anak_kost",
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      unitNumber: "",
    });
    setDialogMode("add");
    setError("");
    setOpenDialog(true);
  };

  const handleOpenEdit = (item: User) => {
    setCurrentItem({ ...item });
    setDialogMode("edit");
    setError("");
    setOpenDialog(true);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, item: User) => {
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
    if (!currentItem.name?.trim()) newError = "Nama wajib diisi";
    if (!currentItem.email?.trim()) newError = "Email wajib diisi";
    if (!currentItem.phone?.trim()) newError = "Nomor telepon wajib diisi";
    if (currentItem.role === "anak_kost" && !currentItem.unitNumber?.trim()) newError = "Nomor unit wajib diisi untuk anak kost";

    if (newError) {
      setError(newError);
      return;
    }

    if (dialogMode === "add") {
      const newUser: User = {
        id: `U${String(usersData.length + 1).padStart(3, "0")}`,
        name: currentItem.name || "",
        email: currentItem.email || "",
        phone: currentItem.phone || "",
        role: currentItem.role as UserRole || "anak_kost",
        status: currentItem.status as "active" | "inactive" || "active",
        createdAt: currentItem.createdAt || new Date().toISOString().split("T")[0],
        unitNumber: currentItem.role === "anak_kost" ? currentItem.unitNumber : undefined,
      };
      setUsersData([...usersData, newUser]);
    } else {
      setUsersData(
        usersData.map((item) =>
          item.id === currentItem.id
            ? { ...currentItem, id: currentItem.id! } as User
            : item
        )
      );
    }

    setOpenDialog(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setUsersData(usersData.filter((item) => item.id !== id));
    }
    handleMenuClose();
  };

  const handleInputChange = (field: keyof User, value: string | UserRole | "active" | "inactive") => {
    if (!currentItem) return;
    setCurrentItem({
      ...currentItem,
      [field]: value,
    });
  };

  const handleRoleChangeInForm = (event: SelectChangeEvent<UserRole>) => {
    const role = event.target.value as UserRole;
    handleInputChange("role", role);
  };

  const handleStatusChangeInForm = (event: SelectChangeEvent<"active" | "inactive">) => {
    const status = event.target.value as "active" | "inactive";
    handleInputChange("status", status);
  };

  // Filter data berdasarkan pencarian
  const filteredData = usersData.filter(item => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.unitNumber && item.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Logika pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getRoleChip = (role: UserRole) => {
    const roleInfo = roleLabels[role];
    return (
      <Chip
        icon={<span style={{ fontSize: '1rem' }}>{roleInfo.icon}</span>}
        label={roleInfo.label}
        size="small"
        variant="filled"
        sx={{
          backgroundColor: roleColors[role].text,
          color: 'white',
          fontWeight: 600,
          borderRadius: 1,
          fontSize: "0.75rem",
          height: "24px",
        }}
      />
    );
  };

  const getStatusChip = (status: "active" | "inactive") => {
    return (
      <Chip
        label={status === "active" ? "Aktif" : "Tidak Aktif"}
        size="small"
        variant="filled"
        sx={{
          backgroundColor: statusColors[status].text,
          color: 'white',
          fontWeight: 600,
          borderRadius: 1,
          fontSize: "0.75rem",
          height: "24px",
        }}
      />
    );
  };

  // Calculate card values
  const adminCount = usersData.filter(user => user.role === 'admin').length;
  const anakKostCount = usersData.filter(user => user.role === 'anak_kost').length;
  const activeCount = usersData.filter(user => user.status === 'active').length;
  const inactiveCount = usersData.filter(user => user.status === 'inactive').length;

  return (
    <Box sx={{ p: 3, maxWidth: "100vw", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom color="text.primary">
          Users Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kelola pengguna sistem dengan sistem manajemen yang modern dan efisien
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
            {adminCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Admin
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
          <Typography variant="h5" color="#7B1FA2" fontWeight={700}>
            {anakKostCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Penghuni Kost
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
            {activeCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Aktif
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
          <Typography variant="h5" color="#C62828" fontWeight={700}>
            {inactiveCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Tidak Aktif
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
          placeholder="Cari user berdasarkan nama, email, atau nomor telepon..."
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
          Tambah User Baru
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
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Nama</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Kontak</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Peran</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Status</TableCell>
              {usersData.some(u => u.role === "anak_kost") ? (
                <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Unit Kost</TableCell>
              ) : null}
              <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: '0.875rem' }}>Tanggal Dibuat</TableCell>
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
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.primary">
                      {item.email}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {getRoleChip(item.role)}
                  </TableCell>
                  <TableCell>
                    {getStatusChip(item.status)}
                  </TableCell>
                  {item.role === "anak_kost" && (
                    <TableCell>
                      <Typography variant="body2" color="text.primary">
                        {item.unitNumber || "-"}
                      </Typography>
                    </TableCell>
                  )}
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </Typography>
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
                        sx={{
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04)
                          }
                        }}
                      >
                        <EditIcon sx={{ mr: 1, fontSize: 16 }} />
                        Edit
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
                <TableCell colSpan={usersData.some(u => u.role === "anak_kost") ? 8 : 7} align="center" sx={{ py: 6 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <PersonIcon sx={{ fontSize: 60, color: 'action.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Tidak ada data pengguna
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mulai dengan menambahkan pengguna baru untuk melihat data di sini
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
          Menampilkan {paginatedData.length} dari {filteredData.length} pengguna
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

      {/* Dialog for adding/editing user */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            fontWeight: 600,
            background: alpha(theme.palette.primary.main, 0.04),
            py: 2
          }}
        >
          {dialogMode === "add" ? "Tambah User Baru" : "Edit User"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Nama Lengkap"
              variant="outlined"
              value={currentItem?.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={currentItem?.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Nomor Telepon"
              variant="outlined"
              value={currentItem?.phone || ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Peran</InputLabel>
              <Select
                value={currentItem?.role || "anak_kost"}
                label="Peran"
                onChange={handleRoleChangeInForm}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="anak_kost">Anak Kost</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Unit Kost"
              variant="outlined"
              value={currentItem?.unitNumber || ""}
              onChange={(e) => handleInputChange("unitNumber", e.target.value)}
              disabled={currentItem?.role !== "anak_kost"}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={currentItem?.status || "active"}
                label="Status"
                onChange={handleStatusChangeInForm}
              >
                <MenuItem value="active">Aktif</MenuItem>
                <MenuItem value="inactive">Tidak Aktif</MenuItem>
              </Select>
            </FormControl>
          </Box>
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