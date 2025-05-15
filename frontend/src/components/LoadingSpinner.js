import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingSpinner = () => (
  <Box 
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
      gap: 2
    }}
  >
    <CircularProgress size={60} thickness={4} />
    <Typography variant="h6">Loading...</Typography>
  </Box>
);

// 3. Colored Spinner (matches your theme)
const ThemedSpinner = () => (
  <CircularProgress 
    sx={{ 
      color: 'primary.main',
      animationDuration: '0.8s'
    }}
    size={40}
    thickness={4}
  />
);