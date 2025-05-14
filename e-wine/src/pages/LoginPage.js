import React from 'react';
import { Box } from '@mui/material';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  return (
    <Box>
      <Navbar />
      <LoginForm />
    </Box>
  );
};

export default LoginPage;