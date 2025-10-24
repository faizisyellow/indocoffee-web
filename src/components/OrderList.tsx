import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  capitalize,
  Alert,
  Button,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ProfileService } from "../service/profile";
import { clientWithAuth } from "../service/axios";
import { prettyErrorServer } from "../utils/prettyErrorServer";
import { ArrowDownUp } from "lucide-react";

const STATUS_COLORS = {
  confirm: "#1976d2",
  roasting: "#f57c00",
  cancelled: "#d32f2f",
  shipped: "#0288d1",
  complete: "#2e7d32",
} as const;

type OrderStatus = keyof typeof STATUS_COLORS | "";

const limit = 8;

export default function OrderList() {
  const [filter, setFilter] = useState<OrderStatus>("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const userService = new ProfileService(clientWithAuth);
  const offset = (page - 1) * limit;

  const {
    data: orders,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users_orders", filter, sort, page, limit, offset],
    queryFn: () =>
      userService.getUsersOrders(
        filter,
        sort,
        limit,
        offset === 0 ? undefined : offset,
      ),
  });

  const errorServer = prettyErrorServer(error, {
    429: " Too many requests — you’ve reached the rate limit. Please wait a few moments before trying again.",
  });

  const handleOrderClick = (orderId: string) => {
    navigate(`/order/${orderId}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: OrderStatus,
  ): void => {
    setFilter(newValue);
    setPage(1);
  };

  const handleTabClick = (status: OrderStatus): void => {
    if (filter === status) {
      setFilter("");
      setPage(1);
    }
  };

  const handleSortToggle = (): void => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError && errorServer) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{errorServer}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ pl: 6 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="end"
        sx={{ mb: 3 }}
      >
        <Tabs
          value={filter || false}
          onChange={handleTabChange}
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
          {Object.keys(STATUS_COLORS).map((status) => (
            <Tab
              key={status}
              value={status}
              label={capitalize(String(status))}
              onClick={() => handleTabClick(status as OrderStatus)}
            />
          ))}
        </Tabs>

        <Button
          variant="outlined"
          size="small"
          onClick={handleSortToggle}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
          }}
        >
          <ArrowDownUp size={16} />
          Sort: {sort === "asc" ? "Older" : "Newest"}
        </Button>
      </Box>

      {!orders || orders.length === 0 ? (
        <Box sx={{ p: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No orders found.
          </Typography>
        </Box>
      ) : (
        orders.map((order) => (
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
                Order #: {order.id ?? "N/A"}
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
                  {capitalize(String(order?.status ?? ""))}
                </Box>
              </Typography>

              <Typography variant="body2">
                Date of order:{" "}
                {order.created_at
                  ? new Date(order.created_at).toLocaleString()
                  : "N/A"}
              </Typography>

              <Typography variant="body2">
                Delivered to:{" "}
                {`${capitalize(String(order.street ?? ""))}, ${capitalize(
                  String(order.city ?? ""),
                )}`}
              </Typography>

              <Typography variant="body2" fontWeight={600} sx={{ mt: 1 }}>
                Total: ${order?.total_price?.toFixed(2) ?? "0.00"}
              </Typography>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                {order.items?.map((p) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={p.id}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        component="img"
                        src={p.image ?? ""}
                        alt={p.bean_name ?? "Product"}
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
                          {`${capitalize(String(p.bean_name ?? ""))} | ${capitalize(
                            String(p.roasted ?? ""),
                          )}`}
                        </Typography>
                        <Typography variant="body2">
                          Form: {capitalize(String(p.form_name ?? ""))}
                        </Typography>
                        <Typography variant="body2">
                          Quantity: {p.order_quantity ?? 0}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        ))
      )}

      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          my: 4,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Page {page} • Showing {orders?.length ?? 0} items
        </Typography>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button
            variant="outlined"
            size="small"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            sx={{ textTransform: "none", minWidth: 90 }}
          >
            Previous
          </Button>

          <Typography variant="body2" sx={{ px: 2, color: "text.secondary" }}>
            Page {page}
          </Typography>

          <Button
            variant="outlined"
            size="small"
            disabled={!orders || orders.length < limit}
            onClick={() => handlePageChange(page + 1)}
            sx={{ textTransform: "none", minWidth: 90 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
