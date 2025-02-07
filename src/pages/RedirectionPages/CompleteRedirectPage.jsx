import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Box, Container } from '@mui/material';

const SuccessPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9fdfd',
        backgroundImage: 'linear-gradient(to bottom, #fff, #f0f6f6)',
      }}
    >
      {loading ? (
        <CircularProgress size={60} thickness={5} />
      ) : (
        <Box textAlign="center">
          <Typography variant="h2" sx={{ color: '#00796b', fontWeight: 'bold' }}>
            "Success !!"
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2, color: '#333' }}>
            Action completed, Great! Once the survey provider approves your session, your balance will be updated.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default SuccessPage;
