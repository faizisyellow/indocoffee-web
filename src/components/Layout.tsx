import { Box, Alert, IconButton } from "@mui/material";
import Header from "./Header";
import HeaderWithAuth from "./HeaderWithAuth";
import { Outlet, useLocation } from "react-router";
import { AuthenticationService } from "../service/authentication";
import { client } from "../service/axios";
import { useState } from "react";
import { X } from "lucide-react";

export default function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  const authService = new AuthenticationService(client);
  const isAuthenticated = authService.isAuthenticated();

  const [showBanner, setShowBanner] = useState(() => {
    return localStorage.getItem("demoBannerDismissed") !== "true";
  });

  const handleCloseBanner = () => {
    setShowBanner(false);
    localStorage.setItem("demoBannerDismissed", "true");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {showBanner && !shouldHideHeader && (
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1200,
            width: "100%",
          }}
        >
          <Alert
            severity="warning"
            sx={{
              borderRadius: 0,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 1.5,
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
            action={
              <IconButton
                color="inherit"
                size="small"
                onClick={handleCloseBanner}
              >
                <X size={18} />
              </IconButton>
            }
          >
            You’re using the <strong>demo version</strong>. You can create up to{" "}
            <strong>2 orders</strong> and add <strong>2 items</strong> to your
            cart.
          </Alert>
        </Box>
      )}

      {/* Header */}
      {!shouldHideHeader && (isAuthenticated ? <HeaderWithAuth /> : <Header />)}

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
