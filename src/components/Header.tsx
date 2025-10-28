// src/components/Header.tsx
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#d32f2f", flexGrow: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Logotyp / titel */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
          Christmas recipes by Grupp 1
        </Typography>

        {/* Enkel meny */}
        <Box sx={{ display: "flex", gap: 2, mt: { xs: 1, sm: 0 } }}>
          <Button sx={{ color: "white" }}>Hem</Button>
          <Button sx={{ color: "white" }}>Julrecept</Button>
          <Button sx={{ color: "white" }}>Sök</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
