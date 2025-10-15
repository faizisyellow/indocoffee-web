import { useNavigate } from "react-router";
import { Box, Typography, Button, Container } from "@mui/material";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "6rem", sm: "8rem", md: "10rem" },
            fontWeight: 700,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            mb: 1,
          }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            maxWidth: "500px",
            mb: 2,
          }}
        >
          The page you're looking for doesn't exist.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
          sx={{
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
