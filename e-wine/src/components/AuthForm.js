// src/components/AuthForm.js
import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Link,
  Paper,
  Avatar,
  Grid,
  IconButton,
  Box
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';

const wineLabels = [
  { id: 1, name: 'Vintage Red', img: '/labels/label1.jpg' },
  { id: 2, name: 'Sunset Valley', img: '/labels/label2.jpg' },
  { id: 3, name: 'Moonlight Blend', img: '/labels/label3.jpg' },
  { id: 4, name: 'Royal Reserve', img: '/labels/label4.jpg' },
  { id: 5, name: 'Golden Harvest', img: '/labels/label5.jpg' },
  { id: 6, name: 'Ancient Roots', img: '/labels/label6.jpg' },
];

// Hash function using SHA-256
async function hashSequence(email, sequence) {
  const data = email + ':' + sequence.join('-');
  const encoder = new TextEncoder();
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', encoder.encode(data));
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const AuthForm = ({ mode = 'login' }) => {
  const [email, setEmail] = useState('');
  const [selectedSequence, setSelectedSequence] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (mode === 'register' && (selectedSequence.length < 3 || selectedSequence.length > 5)) {
      setError('Please select 3 to 5 labels');
      setLoading(false);
      return;
    }

    if (mode === 'login' && selectedSequence.length < 1) {
      setError('Please select your label sequence');
      setLoading(false);
      return;
    }

    const hash = await hashSequence(email, selectedSequence);

    if (mode === 'register') {
      localStorage.setItem('labelAuth', JSON.stringify({
        email,
        hash
      }));
      setLoading(false);
      window.location.href = '/login';
    } else {
      const stored = JSON.parse(localStorage.getItem('labelAuth'));
      if (!stored || stored.email !== email || stored.hash !== hash) {
        setError('Invalid email or label sequence');
        setLoading(false);
        return;
      }
      setLoading(false);
      window.location.href = '/';
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <LockResetIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h4" sx={{ mt: 1 }}>
            {mode === 'register' ? 'Create Account' : 'Welcome Back'}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" sx={{ mb: 2 }}>
            {mode === 'register' 
              ? 'Create your label sequence (3-5 labels)' 
              : 'Select your label sequence'}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            {wineLabels.map((label) => (
              <Grid item xs={4} key={label.id}>
                <IconButton
                  onClick={() => {
                    if (
                      !selectedSequence.includes(label.id) &&
                      selectedSequence.length < 5
                    ) {
                      setSelectedSequence([...selectedSequence, label.id]);
                    }
                  }}
                  disabled={selectedSequence.includes(label.id) || selectedSequence.length >= 5}
                  sx={{
                    p: 1,
                    border: selectedSequence.includes(label.id)
                      ? '3px solid #6d1b1b'
                      : '1px solid #ddd',
                    borderRadius: 1,
                    width: '100%',
                    height: '100%',
                    opacity: selectedSequence.includes(label.id) ? 0.5 : 1
                  }}
                >
                  <Avatar
                    src={label.img}
                    variant="square"
                    sx={{ width: '100%', height: 100 }}
                  />
                </IconButton>
              </Grid>
            ))}
          </Grid>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            sx={{ mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Please wait...' : (mode === 'register' ? 'Create Account' : 'Sign In')}
          </Button>

          <Typography variant="body2" align="center">
            {mode === 'register' ? (
              <>
                Already have an account?{' '}
                <Link component={RouterLink} to="/login">
                  Sign In
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <Link component={RouterLink} to="/register">
                  Register
                </Link>
              </>
            )}
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthForm;