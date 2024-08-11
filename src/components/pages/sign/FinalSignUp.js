import React from 'react';
import { Container, Box, Typography, TextField, Button, Link } from '@mui/material';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission
  };

  return (
    <Container maxWidth="sm">
      <Box className="container">
        <Typography component="h1" variant="h5" className="header">
          Forgot Password
        </Typography>
        <Typography variant="body2" className="body-text">
          We’ll email you a link so you can reset your password.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate className="form">
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="submit-button"
          >
            Reset Password
          </Button>
          <Box className="center-text">
            <Typography variant="body2">
              or <Link href="/login">Log in</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
