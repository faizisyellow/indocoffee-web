import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Button,
} from "@mui/material";
import { ShoppingCart, Coffee } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const cartItemCount = 2;

  const handleLogoClick = () => navigate("/");
  const handleCartClick = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);
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
            <Coffee size={24} color="#000" style={{ marginRight: 8 }} />
            <Typography
              variant="h6"
              sx={{
                color: "#000",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              LOGO
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" onClick={handleLogin}>
                LOGIN
              </Button>
              <Button variant="contained" onClick={handleRegister}>
                REGISTER
              </Button>
            </Box>

            <IconButton
              onClick={handleCartClick}
              sx={{
                bgcolor: "#fff",
                "&:hover": { bgcolor: "#f5f5f5" },
                width: 48,
                height: 48,
              }}
            >
              <Badge badgeContent={cartItemCount} color="primary">
                <ShoppingCart size={24} color="#000" />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <CartDrawer open={cartOpen} onClose={handleCartClose} />
    </>
  );
}
