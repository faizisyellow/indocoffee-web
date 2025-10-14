import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from "@mui/material";
import { ShoppingCart, Coffee, LogOut, User } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] =
    useState<null | HTMLElement>(null);
  const cartItemCount = 2;

  const isLoggedIn = true;
  const userProfile = {
    name: "John Smith",
    email: "johnsmith@mail.com",
    initials: "JS",
  };

  const handleLogoClick = () => navigate("/");
  const handleCartClick = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    console.log("Open profile menu");
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    console.log("Close profile menu");
    setProfileMenuAnchor(null);
  };

  const handleGoToMyAccount = () => {
    console.log("Navigate to my orders");
    navigate("/account");
    handleProfileMenuClose();
  };

  const handleLogout = () => {
    console.log("User logged out");
    handleProfileMenuClose();
  };

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
            {!isLoggedIn ? (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="outlined" onClick={handleLogin}>
                  LOGIN
                </Button>
                <Button variant="contained" onClick={handleRegister}>
                  REGISTER
                </Button>
              </Box>
            ) : (
              <>
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    onClick={handleProfileMenuOpen}
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "#9575CD",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      "&:hover": { opacity: 0.8 },
                    }}
                  >
                    {userProfile.initials}
                  </Avatar>
                  <Menu
                    anchorEl={profileMenuAnchor}
                    open={Boolean(profileMenuAnchor)}
                    onClose={handleProfileMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    slotProps={{
                      paper: {
                        sx: {
                          minWidth: 250,
                          mt: 1,
                        },
                      },
                    }}
                  >
                    {/* User Info Header */}
                    <MenuItem
                      sx={{ flexDirection: "column", alignItems: "flex-start" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {userProfile.name}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {userProfile.email}
                      </Typography>
                    </MenuItem>

                    <Divider sx={{ my: 1 }} />

                    {/* Menu Items */}
                    <MenuItem onClick={handleGoToMyAccount}>
                      <User size={18} style={{ marginRight: 12 }} />
                      <Typography variant="body2">My Account</Typography>
                    </MenuItem>

                    <MenuItem onClick={handleLogout}>
                      <LogOut size={18} style={{ marginRight: 12 }} />
                      <Typography variant="body2">Log out</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <CartDrawer open={cartOpen} onClose={handleCartClose} />
    </>
  );
}
