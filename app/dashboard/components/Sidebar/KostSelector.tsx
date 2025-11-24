import {
  Avatar,
  Box,
  ButtonBase,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const kostList = [
  {
    value: "kost1",
    label: "Rumah Kost 1",
    Icon: HomeIcon, // Pass komponennya langsung
  },
  {
    value: "kost2",
    label: "Rumah Kost 2",
    Icon: ApartmentIcon,
  },
  {
    value: "kost3",
    label: "Rumah Kost 3",
    Icon: HolidayVillageIcon,
  },
];

function KostSelector({
  selectedKost,
  setSelectedKost,
}: {
  selectedKost: string;
  setSelectedKost: (v: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const selected = kostList.find((k) => k.value === selectedKost);

  const SelectedIcon = selected?.Icon;

  return (
    <Box width="100%" sx={{ mt: 1 }}>
      <ButtonBase
        onClick={handleOpen}
        sx={{
          width: "100%",
          borderRadius: 3,
          px: 1.5,
          py: 1,
          bgcolor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "inset 0 0 0 1px #e0e0e0",
        }}
      >
        {/* Left content */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <Avatar
            sx={{
              width: 26,
              height: 26,
              bgcolor: "#e0e0e0",
              color: "text.primary",
            }}
          >
            {SelectedIcon && <SelectedIcon sx={{ fontSize: 18 }} />}
          </Avatar>
          <Typography fontSize="0.9rem" fontWeight={600}>
            {selected?.label}
          </Typography>
        </Box>

        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </ButtonBase>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ minWidth: 220, p: 0.5 }}>
          {kostList.map((kost) => {
            const ItemIcon = kost.Icon;

            return (
              <MenuItem
                key={kost.value}
                onClick={() => {
                  setSelectedKost(kost.value);
                  // Menyimpan pilihan kost ke localStorage agar bisa dibaca oleh komponen lain
                  localStorage.setItem("selectedKost", kost.value);
                  // Trigger event storage agar komponen lain bisa merespons (tidak otomatis di halaman lain)
                  window.dispatchEvent(new StorageEvent('storage', {
                    key: 'selectedKost',
                    newValue: kost.value
                  }));
                  handleClose();
                }}
                sx={{ py: 1.2, gap: 1.5 }}
              >
                <Avatar
                  sx={{
                    width: 26,
                    height: 26,
                    bgcolor: "#e0e0e0",
                    color: "text.primary",
                  }}
                >
                  <ItemIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Typography>{kost.label}</Typography>
              </MenuItem>
            );
          })}
        </Box>
      </Popover>
    </Box>
  );
}

export default KostSelector;
