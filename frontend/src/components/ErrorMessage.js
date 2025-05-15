// src/components/ErrorMessage.js
import React from 'react';
import { 
  Alert,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ErrorMessage = ({ 
  error, 
  onClose, 
  position = 'top', 
  severity = 'error' 
}) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  if (!error) return null;

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        sx={{
          mb: 2,
          position: position === 'fixed' ? 'fixed' : 'static',
          top: position === 'fixed' ? 16 : 'auto',
          left: '50%',
          transform: position === 'fixed' ? 'translateX(-50%)' : 'none',
          zIndex: 9999,
          width: position === 'fixed' ? '90%' : 'auto',
          maxWidth: 600
        }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {typeof error === 'string' ? (
          <Typography variant="body1">{error}</Typography>
        ) : (
          <List dense sx={{ py: 0 }}>
            {error.messages?.map((msg, index) => (
              <ListItem key={index} sx={{ py: 0 }}>
                <ListItemText primary={msg} />
              </ListItem>
            ))}
            {error.message && (
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary={error.message} />
              </ListItem>
            )}
          </List>
        )}
      </Alert>
    </Collapse>
  );
};

export default ErrorMessage;