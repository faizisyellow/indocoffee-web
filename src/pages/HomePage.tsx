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
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router";

const mockProducts = [
  {
    id: 1,
    name: "ARABICA",
    price: 150,
    image: "/coffee-arabica.jpg",
    type: "WHOLE COFFEE BEANS",
    size: "200G",
    roast: "LIGHT",
    form: "WHOLE BEAN",
    bean: "ARABICA",
  },
  {
    id: 2,
    name: "ROBUSTA",
    price: 120,
    image: "/coffee-robusta.jpg",
    type: "WHOLE COFFEE BEANS",
    size: "200G",
    roast: "DARK",
    form: "WHOLE BEAN",
    bean: "ROBUSTA",
  },
  {
    id: 3,
    name: "LIBERICA",
    price: 180,
    image: "/coffee-liberica.jpg",
    type: "WHOLE COFFEE BEANS",
    size: "200G",
    roast: "MEDIUM",
    form: "GROUND BEAN",
    bean: "ARABICA",
  },
  {
    id: 4,
    name: "EXCELSA",
    price: 160,
    image: "/coffee-excelsa.jpg",
    type: "WHOLE COFFEE BEANS",
    size: "200G",
    roast: "LIGHT",
    form: "WHOLE BEAN",
    bean: "ROBUSTA",
  },
  {
    id: 5,
    name: "EXCELSA",
    price: 160,
    image: "/coffee-excelsa.jpg",
    type: "WHOLE COFFEE BEANS",
    size: "200G",
    roast: "LIGHT",
    form: "WHOLE BEAN",
    bean: "ROBUSTA",
  },
  {
    id: 6,
    name: "EXCELSA",
    price: 160,
    image: "/coffee-excelsa.jpg",
    type: "WHOLE COFFEE BEANS",
    size: "200G",
    roast: "LIGHT",
    form: "WHOLE BEAN",
    bean: "ROBUSTA",
  },
  {
    id: 7,
    name: "EXCELSA",
    price: 160,
    image: "/coffee-excelsa.jpg",
    type: "WHOLE COFFEE BEANS",
    size: "200G",
    roast: "LIGHT",
    form: "WHOLE BEAN",
    bean: "ROBUSTA",
  },
  {
    id: 8,
    name: "EXCELSA",
    price: 160,
    image: "/coffee-excelsa.jpg",
    type: "WHOLE COFFEE BEANS",
    size: "200G",
    roast: "LIGHT",
    form: "WHOLE BEAN",
    bean: "ROBUSTA",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    console.log("Navigate to product:", productId);
    navigate(`/product/${productId}`);
  };

  const handleFormChange = (form: string) => {
    console.log("Filter by form:", form);
  };

  const handleBeanChange = (bean: string) => {
    console.log("Filter by bean:", bean);
  };

  const handleSortChange = (sortOption: string) => {
    console.log("Sort by name:", sortOption);
  };

  const handleClearAllFilters = () => {
    console.log("Clear all filters");
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    console.log("Page changed to:", page);
  };

  const forms = ["WHOLE BEAN", "GROUND BEAN"];
  const beans = ["ARABICA", "ROBUSTA"];

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
              <MenuItem value="asc">Name (A-Z)</MenuItem>
              <MenuItem value="desc">Name (Z-A)</MenuItem>
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
                {forms.map((form) => (
                  <FormControlLabel
                    key={form}
                    control={
                      <Checkbox
                        size="small"
                        onChange={() => handleFormChange(form)}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                        {form}
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
                {beans.map((bean) => (
                  <FormControlLabel
                    key={bean}
                    control={
                      <Checkbox
                        size="small"
                        onChange={() => handleBeanChange(bean)}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                        {bean}
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
            {mockProducts.map((product) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                sx={{ marginBottom: 2 }}
                key={product.id}
              >
                <Card sx={{ height: "100%", borderRadius: 0 }}>
                  <Box
                    component="img"
                    src={
                      "https://xqe3120hr5.ufs.sh/f/H9qtOxZed3fhDOhPjcn7VTApPwYdvjUimq06kQcZJ1rsEI8x"
                    }
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
                      {product.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}
                    >
                      ${product.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                    >
                      {product.type}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                    >
                      SIZE | {product.size}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                    >
                      ROAST | {product.roast}
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

          {mockProducts.length === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 400,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No products found. Try adjusting your filters.
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              mt: 4,
              mb: 2,
            }}
          >
            <Pagination
              count={5}
              defaultPage={1}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
