import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function OrderList() {
  const [filter, setFilter] = useState("current");
  const navigate = useNavigate();

  const handleOrderClick = (orderId: string) => {
    console.log("Navigate to order:", orderId);
    navigate(`/order/${orderId}`);
  };

  const orders = [
    {
      id: "2135153sads",
      status: "On the way",
      deliveryDate: "Fri, 13 Nov, 2025",
      address: "Great street, New York Brooklyn 5A, PO: 212891",
      total: 340,
      products: [
        {
          id: 1,
          name: "Great product name goes here",
          price: 340,
          color: "Silver",
          size: "Large",
          quantity: 1,
          image:
            "https://xqe3120hr5.ufs.sh/f/H9qtOxZed3fhDOhPjcn7VTApPwYdvjUimq06kQcZJ1rsEI8x",
        },
        {
          id: 2,
          name: "Table lamp for office or bedroom",
          price: 76,
          color: "Silver",
          size: "Large",
          quantity: 1,
          image:
            "https://xqe3120hr5.ufs.sh/f/H9qtOxZed3fhDOhPjcn7VTApPwYdvjUimq06kQcZJ1rsEI8x",
        },
      ],
    },
  ];

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

      {orders.map((order) => (
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
            <Typography variant="body2" sx={{ color: "#555" }}>
              Status:{" "}
              <Box component="span" sx={{ color: "#f57c00", fontWeight: 600 }}>
                {order.status}
              </Box>
            </Typography>
            <Typography variant="body2">
              Date of delivery: {order.deliveryDate}
            </Typography>
            <Typography variant="body2">
              Delivered to: {order.address}
            </Typography>
            <Typography variant="body2" fontWeight={600} sx={{ mt: 1 }}>
              Total: ${order.total.toFixed(2)}
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              {order.products.map((p) => (
                <Grid size={{ xs: 12, sm: 6 }} key={p.id}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component="img"
                      src={p.image}
                      alt={p.name}
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
                        {p.name}
                      </Typography>
                      <Typography variant="body2">
                        Quantity: {p.quantity} × USD {p.price}
                      </Typography>
                      <Typography variant="body2">Color: {p.color}</Typography>
                      <Typography variant="body2">Size: {p.size}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
