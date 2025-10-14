import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import { ShoppingCart, Coffee } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const cartItemCount = 2;

  const handleLogoClick = () => {
    console.log("Navigate to home");
    navigate("/");
  };

  const handleCartClick = () => {
    console.log("Open cart drawer");
    setCartOpen(true);
  };

  const handleCartClose = () => {
    console.log("Close cart drawer");
    setCartOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#e0e0e0",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
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
        </Toolbar>
      </AppBar>

      <CartDrawer open={cartOpen} onClose={handleCartClose} />
    </>
  );
}
