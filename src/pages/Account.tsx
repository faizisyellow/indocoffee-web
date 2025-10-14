import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import AccountSidebar from "../components/AccountSidebar";
import OrderList from "../components/OrderList";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function AccountPage() {
  const [selectedMenu, setSelectedMenu] = useState("orders");
  const navigate = useNavigate();

  const user = {
    name: "Lizzy McAlpine",
    email: "lizzy@test.test",
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "orders":
        return <OrderList />;
      default:
        return null;
    }
  };

  function handleGoBack() {
    navigate("/");
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
          mb: 4,
          flexWrap: "wrap",
          rowGap: 4,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowLeft size={18} />}
          sx={{
            color: "#0b341b",
            borderColor: "#0b341b",
            textTransform: "none",
            fontWeight: 600,
          }}
          onClick={handleGoBack}
        >
          Back browse to products
        </Button>

        <Box>
          <Typography variant="h5" fontWeight={700} color="#0b341b">
            Your Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.name}, Email: {user.email}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", minHeight: "80vh", gap: 3 }}>
        <AccountSidebar selected={selectedMenu} onSelect={setSelectedMenu} />
        <Box sx={{ flexGrow: 1, bgcolor: "transparent" }}>
          {renderContent()}
        </Box>
      </Box>
    </Container>
  );
}
