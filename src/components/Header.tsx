import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => navigate("/");
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": { opacity: 0.8 },
            }}
            onClick={handleLogoClick}
          >
            <Typography
              variant="h3"
              sx={{
                color: "#000",
                fontWeight: 700,
                fontSize: "26px",
                letterSpacing: "0.05em",
              }}
            >
              INDOCOFFEE
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" onClick={handleLogin}>
                LOGIN
              </Button>
              <Button variant="contained" onClick={handleRegister}>
                REGISTER
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
