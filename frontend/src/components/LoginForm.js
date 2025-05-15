// src/components/LoginForm.js
import React, { useState } from 'react';
import { 
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import { 
  Google,
  Facebook,
  Twitter,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.email = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(formData.email) ? '' : 'Invalid email';
    tempErrors.password = formData.password.length >= 6 ? '' : 'Password must be at least 6 characters';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle login logic here
      console.log('Form submitted:', formData);
      // Simulate API call
      setTimeout(() => {
        window.location.href = '/'; // Redirect after login
      }, 1000);
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ minHeight: '80vh', py: 8 }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box sx={{ 
          p: 4, 
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper'
        }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Welcome Back
          </Typography>

          {/* Social Login */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <IconButton
              fullWidth
              variant="outlined"
              sx={{ 
                border: '1px solid',
                borderColor: 'divider',
                color: 'text.primary'
              }}
            >
              <Google />
            </IconButton>
            <IconButton
              fullWidth
              variant="outlined"
              sx={{ 
                border: '1px solid',
                borderColor: 'divider',
                color: 'text.primary'
              }}
            >
              <Facebook />

              <Twitter />

            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }}>OR</Divider>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{ 
                mt: 3,
                py: 1.5,
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.dark' }
              }}
            >
              Sign In
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Link 
                component={RouterLink} 
                to="/forgot-password" 
                sx={{ color: 'text.secondary' }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Don't have an account? {' '}
                <Link 
                  component={RouterLink} 
                  to="/register" 
                  sx={{ fontWeight: 'bold' }}
                >
                  Create Account
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;