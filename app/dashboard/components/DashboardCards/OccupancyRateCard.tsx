import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Stack,
  Avatar,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

interface OccupancyRateCardProps {
  title?: string;
  occupiedUnits: number;
  totalUnits: number;
  occupancyPercentage: number;
}

const OccupancyRateCard: React.FC<OccupancyRateCardProps> = ({
  title = "Tingkat Okupansi",
  occupiedUnits,
  totalUnits,
  occupancyPercentage,
}) => {
  const availableUnits = totalUnits - occupiedUnits;

  // Menentukan warna berdasarkan tingkat okupansi
  const getOccupancyColor = () => {
    if (occupancyPercentage >= 90) return "#4caf50"; // hijau
    if (occupancyPercentage >= 70) return "#ff9800"; // oranye
    return "#f44336"; // merah
  };

  // Membuat ring progress dengan SVG
  const size = 90; // Ukuran lebih kecil
  const strokeWidth = 6; // Stroke lebih tipis
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (occupancyPercentage / 100) * circumference;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        border: "1px solid",
        borderColor: "divider"
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: `${getOccupancyColor()}20`, // menambahkan opacity ke warna
              color: getOccupancyColor(),
              width: 32,
              height: 32,
            }}
          >
            <MeetingRoomIcon fontSize="small" />
          </Avatar>
        }
        title={
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            {title}
          </Typography>
        }
        sx={{ pb: 0.5, pt: 1 }}
      />
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#e0e0e030" // menambahkan opacity untuk membuatnya lebih halus
              strokeWidth={strokeWidth}
            />
            {/* Progress ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={getOccupancyColor()}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{
                transition: "stroke-dashoffset 1s ease-in-out",
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          </svg>
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              fontWeight={700}
              color={getOccupancyColor()}
            >
              {occupancyPercentage}%
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={1.5} mt={1} width="100%">
          <Box textAlign="center" flex={1}>
            <Typography variant="body2" fontWeight={700} color="primary.main">
              {occupiedUnits}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Terisi
            </Typography>
          </Box>
          <Box textAlign="center" flex={1}>
            <Typography variant="body2" fontWeight={700} color="error.main">
              {availableUnits}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Kosong
            </Typography>
          </Box>
          <Box textAlign="center" flex={1}>
            <Typography variant="body2" fontWeight={700} color="text.primary">
              {totalUnits}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total
            </Typography>
          </Box>
        </Stack>

        <Box mt={1} width="100%">
          <Typography
            variant="caption"
            align="center"
            color={getOccupancyColor()}
            fontWeight={600}
            display="block"
            sx={{ lineHeight: 1.3 }}
          >
            {occupancyPercentage >= 90
              ? "Okupansi tinggi"
              : occupancyPercentage >= 70
              ? "Okupansi bagus"
              : "Tingkatkan okupansi"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OccupancyRateCard;
