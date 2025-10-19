import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Pagination,
  capitalize,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ProfileService } from "../service/profile";
import { clientWithAuth } from "../service/axios";

const STATUS_COLORS = {
  confirm: "#1976d2",
  roasting: "#f57c00",
  cancelled: "#d32f2f",
  shipped: "#0288d1",
  complete: "#2e7d32",
};

export default function OrderList() {
  const [filter, setFilter] = useState("current");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const userService = new ProfileService(clientWithAuth);

  const getOrders = useQuery({
    queryKey: ["users_orders"],
    queryFn: () => {
      return userService.getUsersOrders();
    },
  });

  const handleOrderClick = (orderId: string) => {
    console.log("Navigate to order:", orderId);
    navigate(`/order/${orderId}`);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const totalPages = 10;

  return (
    <Box sx={{ pl: 6 }}>
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={filter}
          onChange={(e, v) => setFilter(v)}
          sx={{
            mt: 2,
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              minWidth: 120,
              color: "#0b341b",
            },
            "& .Mui-selected": {
              color: "#0b341b",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#0b341b",
            },
          }}
        >
          <Tab value="current" label="Current" />
          <Tab value="unpaid" label="Unpaid" />
          <Tab value="all" label="All orders" />
        </Tabs>
      </Box>

      {getOrders?.data?.map((order) => (
        <Card
          onClick={() => handleOrderClick(order.id)}
          key={order.id}
          sx={{
            mb: 3,
            boxShadow: "none",
            border: "1px solid #ddd",
            cursor: "pointer",
          }}
        >
          <CardContent>
            <Typography variant="subtitle1" fontWeight={600}>
              Order #: {order.id}
            </Typography>
            <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
              Status:{" "}
              <Box
                component="span"
                sx={{
                  color:
                    STATUS_COLORS[
                      order.status?.toLowerCase() as keyof typeof STATUS_COLORS
                    ] || "#555",
                  fontWeight: 600,
                }}
              >
                {capitalize(order.status)}
              </Box>
            </Typography>
            <Typography variant="body2">
              Date of order: {new Date(order.created_at).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Delivered to:{" "}
              {`${capitalize(order.street)}, ${capitalize(order.city)}`}
            </Typography>
            <Typography variant="body2" fontWeight={600} sx={{ mt: 1 }}>
              Total: ${order.total_price.toFixed(2)}
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              {order.items.map((p) => (
                <Grid size={{ xs: 12, sm: 6 }} key={p.id}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component="img"
                      src={p.image}
                      alt={p.bean_name}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        objectFit: "cover",
                        bgcolor: "#f9f9f9",
                      }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {`${capitalize(p.bean_name)} | ${capitalize(p.roasted)}`}
                      </Typography>
                      <Typography variant="body2">
                        Form: {capitalize(p.form_name)}
                      </Typography>
                      <Typography variant="body2">
                        Quantity: {p.order_quantity}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mb: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}
