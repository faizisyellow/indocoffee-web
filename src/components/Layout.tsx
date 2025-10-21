import { Box } from "@mui/material";
import Header from "./Header";
import HeaderWithAuth from "./HeaderWithAuth";
import { Outlet } from "react-router";
import { useLocation } from "react-router";
import { AuthenticationService } from "../service/authentication";
import { client } from "../service/axios";

export default function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  const authService = new AuthenticationService(client);
  const isAuthenticated = authService.isAuthenticated();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!shouldHideHeader && (isAuthenticated ? <HeaderWithAuth /> : <Header />)}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
