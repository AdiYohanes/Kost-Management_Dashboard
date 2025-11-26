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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
  lastLogin: string | null;
}

// Sample data for demonstration
const initialUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "active",
    createdAt: "2023-01-15",
    lastLogin: "2023-11-25",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Manager",
    status: "active",
    createdAt: "2023-02-20",
    lastLogin: "2023-11-24",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "User",
    status: "inactive",
    createdAt: "2023-03-10",
    lastLogin: "2023-10-15",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "User",
    status: "active",
    createdAt: "2023-04-05",
    lastLogin: "2023-11-20",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "Manager",
    status: "inactive",
    createdAt: "2023-05-12",
    lastLogin: null,
  },
  {
    id: "6",
    name: "Diana Davis",
    email: "diana.davis@example.com",
    role: "User",
    status: "active",
    createdAt: "2023-06-18",
    lastLogin: "2023-11-23",
  },
  {
    id: "7",
    name: "Ethan Miller",
    email: "ethan.miller@example.com",
    role: "User",
    status: "active",
    createdAt: "2023-07-22",
    lastLogin: "2023-11-22",
  },
  {
    id: "8",
    name: "Fiona Garcia",
    email: "fiona.garcia@example.com",
    role: "Admin",
    status: "active",
    createdAt: "2023-08-30",
    lastLogin: "2023-11-25",
  },
];

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<User> | null>(null);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [error, setError] = useState("");

  const handleOpenAdd = () => {
    setCurrentItem({
      name: "",
      email: "",
      role: "User",
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: null,
    });
    setDialogMode("add");
    setError("");
    setOpenDialog(true);
  };

  const handleOpenEdit = (user: User) => {
    setCurrentItem({ ...user });
    setDialogMode("edit");
    setError("");
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (!currentItem) return;

    let newError = "";
    if (!currentItem.name?.trim()) newError = "Nama wajib diisi";
    if (!currentItem.email?.trim()) newError = "Email wajib diisi";
    if (!currentItem.role?.trim()) newError = "Role wajib dipilih";

    if (newError) {
      setError(newError);
      return;
    }

    if (dialogMode === "add") {
      const newUser: User = {
        id: (users.length + 1).toString(),
        name: currentItem.name || "",
        email: currentItem.email || "",
        role: currentItem.role || "User",
        status: currentItem.status as "active" | "inactive" || "active",
        createdAt: currentItem.createdAt || new Date().toISOString().split("T")[0],
        lastLogin: currentItem.lastLogin || null,
      };
      setUsers([...users, newUser]);
    } else {
      setUsers(
        users.map((user) =>
          user.id === currentItem.id
            ? { ...currentItem, id: currentItem.id! } as User
            : user
        )
      );
    }

    setOpenDialog(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleInputChange = (field: keyof User, value: string | "active" | "inactive") => {
    if (!currentItem) return;
    setCurrentItem({
      ...currentItem,
      [field]: value,
    });
  };

  const getStatusColor = (status: "active" | "inactive") => {
    switch (status) {
      case "active":
        return { bgcolor: "#e8f5e9", color: "#2e7d32" }; // hijau muda
      case "inactive":
        return { bgcolor: "#ffebee", color: "#c62828" }; // merah muda
      default:
        return { bgcolor: "#f5f5f5", color: "#616161" };
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Users Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kelola pengguna sistem di sini
        </Typography>
      </Box>

      {/* Search Bar and Add Button */}
      <Paper
        sx={{
          p: 1.5,
          mb: 3,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2
        }}
      >
        <TextField
          placeholder="Cari pengguna..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1, minWidth: 250 }}
        />
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
        >
          Tambah User
        </Button>
      </Paper>

      {/* Table */}
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
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Nama</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Dibuat Tanggal</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Login Terakhir</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="body2" fontWeight={600}>
                      {user.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {user.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      size="small"
                      variant="filled"
                      sx={{
                        bgcolor:
                          user.role === "Admin" ? "#e3f2fd" :
                          user.role === "Manager" ? "#fff3e0" :
                          "#f3e5f5",
                        color:
                          user.role === "Admin" ? "#1976d2" :
                          user.role === "Manager" ? "#ef6c00" :
                          "#7b1fa2",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        height: "24px",
                        border: "1px solid",
                        borderColor:
                          user.role === "Admin" ? "rgba(25, 118, 210, 0.3)" :
                          user.role === "Manager" ? "rgba(239, 108, 0, 0.3)" :
                          "rgba(123, 31, 162, 0.3)"
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status === "active" ? "Aktif" : "Tidak Aktif"}
                      size="small"
                      variant="outlined"
                      sx={{
                        ...getStatusColor(user.status),
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        height: "24px"
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(user.createdAt).toLocaleDateString('id-ID')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={user.lastLogin ? "text.primary" : "text.disabled"}
                    >
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('id-ID') : "Belum pernah login"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton 
                        size="small"
                        onClick={() => handleOpenEdit(user)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDelete(user.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    Tidak ada data pengguna ditemukan
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for adding/editing users */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
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
              type="email"
              value={currentItem?.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={currentItem?.role || "User"}
                label="Role"
                onChange={(e) => handleInputChange("role", e.target.value)}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={currentItem?.status || "active"}
                label="Status"
                onChange={(e) => handleInputChange("status", e.target.value as "active" | "inactive")}
              >
                <MenuItem value="active">Aktif</MenuItem>
                <MenuItem value="inactive">Tidak Aktif</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Batal</Button>
          <Button onClick={handleSave} variant="contained">
            {dialogMode === "add" ? "Tambah" : "Simpan"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}