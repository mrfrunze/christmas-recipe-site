import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <Box display="flex" justifyContent="center">
      <TextField
        variant="outlined"
        placeholder="Sök recept..."
        sx={{
          width: "100%",
          maxWidth: 600,
          backgroundColor: "white",
          borderRadius: "8px",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
