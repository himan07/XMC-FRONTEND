import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const LandingPage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          backgroundColor: "#f8f9fa",
          py: 12,
          backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                fontWeight="bold"
                gutterBottom
                color="primary"
              >
                Your Health Matters
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                Participate in our healthcare surveys to help improve medical
                research and patient care worldwide.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ borderRadius: 2, py: 1.5, px: 4 }}
                >
                  Take Survey
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ borderRadius: 2, py: 1.5, px: 4 }}
                >
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
                alt="Healthcare professionals"
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
          color="primary"
        >
          Why Participate?
        </Typography>
        <Grid container spacing={4} mt={4}>
          {[
            {
              title: "Advance Research",
              description:
                "Your responses contribute to groundbreaking medical research and improvements in healthcare.",
              image:
                "https://images.unsplash.com/photo-1581093458791-4a2b7c818b6b?auto=format&fit=crop&q=80",
            },
            {
              title: "Improve Care",
              description:
                "Help healthcare providers understand patient needs and enhance the quality of care.",
              image:
                "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80",
            },
            {
              title: "Shape the Future",
              description:
                "Be part of innovations that will define the future of healthcare delivery.",
              image:
                "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={feature.image}
                    alt={feature.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "white",
          py: 8,
        }}
      >
        <Container>
          <Stack alignItems="center" spacing={3}>
            <Typography variant="h3" textAlign="center" fontWeight="bold">
              Ready to Make a Difference?
            </Typography>
            <Typography variant="h6" textAlign="center" sx={{ opacity: 0.8 }}>
              Join thousands of participants contributing to better healthcare
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "white",
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: "white",
                  opacity: 0.9,
                },
                borderRadius: 2,
                py: 1.5,
                px: 4,
              }}
            >
              Start Survey Now
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
