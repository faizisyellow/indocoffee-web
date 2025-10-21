import {
  Container,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  capitalize,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { InventoryService } from "../service/inventory";
import { client } from "../service/axios";
import { useState } from "react";

const limit = 8;

export default function HomePage() {
  const [selectedForm, setSelectedForm] = useState<number | null>(null);
  const [selectedBean, setSelectedBean] = useState<number | null>(null);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(1);

  const navigate = useNavigate();
  const inventoryService = new InventoryService(client);

  const offset = (page - 1) * limit;
  const getProducts = useQuery({
    queryKey: [
      "products",
      selectedBean,
      selectedForm,
      sort,
      page,
      limit,
      offset,
    ],
    queryFn: () => {
      return inventoryService.GetProducts(
        selectedBean ?? undefined,
        selectedForm ?? undefined,
        sort,
        limit,
        offset === 0 ? undefined : offset,
      );
    },
  });

  const getBeans = useQuery({
    queryKey: ["beans"],
    queryFn: () => {
      return inventoryService.GetBeans();
    },
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const getForms = useQuery({
    queryKey: ["forms"],
    queryFn: () => {
      return inventoryService.GetForms();
    },
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleFormChange = (form: number) => {
    setSelectedForm((prev) => (prev === form ? null : form));
  };

  const handleBeanChange = (bean: number) => {
    setSelectedBean((prev) => (prev === bean ? null : bean));
  };

  const handleSortChange = (sortOption: string) => {
    setSort(sortOption as "asc" | "desc");
  };

  const handleClearAllFilters = () => {
    setSelectedForm(null);
    setSelectedBean(null);
    setSort("asc");
  };

  const handlePageChange = (page: number) => {
    setPage(page++);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Filter
          </Typography>
          <Button
            variant="text"
            size="small"
            onClick={handleClearAllFilters}
            sx={{ textTransform: "capitalize", fontSize: "0.875rem" }}
          >
            Clear All
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Order by
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              defaultValue="asc"
              onChange={(e) => handleSortChange(e.target.value)}
              variant="outlined"
            >
              <MenuItem value="asc">Price (Low)</MenuItem>
              <MenuItem value="desc">Price (High)</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Filter Bar */}
        <Grid size={{ xs: 12, md: 2.5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
              p: 2.5,
            }}
          >
            {/* Form Filter */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 1.5, fontSize: "0.875rem" }}
              >
                Form
              </Typography>
              <FormGroup>
                {getForms?.data?.map((form) => (
                  <FormControlLabel
                    key={form.id}
                    control={
                      <Checkbox
                        size="small"
                        checked={selectedForm === form.id}
                        onChange={() => handleFormChange(form.id)}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                        {form.name.toUpperCase()}
                      </Typography>
                    }
                  />
                ))}
              </FormGroup>
            </Box>

            <Box sx={{ height: 1, bgcolor: "rgba(0, 0, 0, 0.1)" }} />

            {/* Bean Filter */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 1.5, fontSize: "0.875rem" }}
              >
                Bean
              </Typography>
              <FormGroup>
                {getBeans?.data?.map((bean) => (
                  <FormControlLabel
                    key={bean.id}
                    control={
                      <Checkbox
                        size="small"
                        checked={selectedBean === bean.id}
                        onChange={() => handleBeanChange(bean.id)}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                        {bean.name.toUpperCase()}
                      </Typography>
                    }
                  />
                ))}
              </FormGroup>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 9.5 }}>
          <Grid container spacing={3}>
            {getProducts?.data?.map((product) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                sx={{ marginBottom: 2 }}
                key={product.id}
              >
                <Card sx={{ height: "100%", borderRadius: 0 }}>
                  <Box
                    component="img"
                    src={product.image}
                    alt={"product"}
                    sx={{
                      width: "100%",
                      height: 280,
                      bgcolor: "#333",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      objectFit: "cover",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: 700, mb: 1 }}
                    >
                      {capitalize(product.bean.name)}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                    >
                      {capitalize(product.form.name)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                    >
                      ROAST | {capitalize(product.roasted)}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleProductClick(product.id)}
                    >
                      View Detail
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {!getProducts.isLoading && getProducts.data?.length === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 400,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No products found. Try adjusting your filters.
              </Typography>
            </Box>
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
              Page {page} • Showing {getProducts?.data?.length} items
            </Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button
                variant="outlined"
                size="small"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                sx={{
                  textTransform: "none",
                  minWidth: 90,
                }}
              >
                Previous
              </Button>
              <Typography
                variant="body2"
                sx={{ px: 2, color: "text.secondary" }}
              >
                Page {page}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                disabled={!getProducts.data || getProducts.data.length < limit}
                onClick={() => handlePageChange(page + 1)}
                sx={{
                  textTransform: "none",
                  minWidth: 90,
                }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
