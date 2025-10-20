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
import { ShoppingCart, LogOut, User } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useNavigate } from "react-router";
import { AuthenticationService } from "../service/authentication";
import { clientWithAuth } from "../service/axios";
import { useQuery } from "@tanstack/react-query";
import { ProfileService } from "../service/profile";

export default function Header() {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] =
    useState<null | HTMLElement>(null);

  const authService = new AuthenticationService(clientWithAuth);
  const profileService = new ProfileService(clientWithAuth);

  const isLoggedIn = authService.isAuthenticated();

  const getProfileResult = useQuery({
    queryKey: ["users"],
    queryFn: () => profileService.getProfile(),
    enabled: isLoggedIn,
  });

  const { data: cartsData } = useQuery({
    queryKey: ["carts"],
    queryFn: () => profileService.GetUsersCarts(),
  });

  const cartCount = cartsData?.carts?.length ?? 0;

  const handleLogoClick = () => navigate("/");
  const handleCartClick = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleGoToMyAccount = () => {
    navigate("/account");
    handleProfileMenuClose();
  };

  const handleLogout = () => {
    authService.logout();
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
                  <Badge badgeContent={cartCount} color="primary">
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
                    {getProfileResult.isLoading || getProfileResult.isError
                      ? "U"
                      : getProfileResult.data?.username[0].toUpperCase()}
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
                    {/* User Info */}
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
                          {getProfileResult.data?.username ?? "User"}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {getProfileResult.data?.email ?? ""}
                      </Typography>
                    </MenuItem>

                    <Divider sx={{ my: 1 }} />

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
