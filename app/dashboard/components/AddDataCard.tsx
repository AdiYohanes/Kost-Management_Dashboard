import { Paper, Stack, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function AddDataCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: "100%",
        borderRadius: 2,
        border: "2px dashed",
        borderColor: "divider",
        bgcolor: "background.paper",
        cursor: "pointer",
        transition: "0.25s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          borderColor: "primary.main",
          bgcolor: "action.hover",
        },
      }}
    >
      <Stack alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.main",
            bgcolor: "rgba(0, 123, 255, 0.08)",
            transition: "0.2s",
          }}
        >
          <AddIcon fontSize="small" />
        </Box>

        <Typography variant="body2" fontWeight={600} color="text.primary">
          Add Data
        </Typography>
      </Stack>
    </Paper>
  );
}

export default AddDataCard;
