import { Box } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router";
import { useLocation } from "react-router";

export default function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!shouldHideHeader && <Header />}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
