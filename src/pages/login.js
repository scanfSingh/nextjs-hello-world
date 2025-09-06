import React, { useState } from 'react';
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
  Alert,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Paper
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  ArrowBack
} from '@mui/icons-material';

const theme = {
  primary: {
    main: '#667eea',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  background: {
    main: '#f8fafc',
    card: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  }
};

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log('Login submitted:', formData);
      setIsSubmitting(false);
      // In real app, handle login success/failure here
    }, 1000);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: theme.background.main,
      display: 'flex',
      alignItems: 'center',
      py: 4
    }}>
      {/* Back Button */}
      <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBack />}
          sx={{
            color: theme.primary.main,
            fontWeight: '500',
            '&:hover': {
              backgroundColor: 'rgba(102, 126, 234, 0.1)'
            }
          }}
        >
          Back to Home
        </Button>
      </Box>

      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            background: theme.background.card,
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 25px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: theme.primary.gradient,
              p: 6,
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                right: '-20px',
                width: '100px',
                height: '200%',
                background: 'rgba(255, 255, 255, 0.1)',
                transform: 'rotate(15deg)'
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  background: 'rgba(255, 255, 255, 0.2)',
                  mx: 'auto',
                  mb: 2,
                  fontSize: '2rem',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                🔑
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                Welcome Back
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Sign in to continue your JavaScript learning journey
              </Typography>
            </Box>
          </Box>

          {/* Form */}
          <CardContent sx={{ p: 6 }}>
            <Box component="form" onSubmit={handleSubmit}>
              {/* Email Field */}
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: theme.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.primary.main,
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: theme.primary.main }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: theme.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.primary.main,
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: theme.primary.main }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: theme.primary.main }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Remember Me */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      sx={{
                        color: theme.primary.main,
                        '&.Mui-checked': {
                          color: theme.primary.main,
                        },
                      }}
                    />
                  }
                  label="Remember me"
                />
                <Button
                  variant="text"
                  sx={{
                    color: theme.primary.main,
                    fontWeight: '500',
                    textDecoration: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(102, 126, 234, 0.1)',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Forgot password?
                </Button>
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  background: theme.primary.gradient,
                  color: 'white',
                  fontWeight: 'bold',
                  py: 2,
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  mb: 3,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                  },
                  '&:disabled': {
                    background: '#ccc',
                    transform: 'none'
                  }
                }}
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>

              {/* Divider */}
              <Divider sx={{ mb: 3 }}>
                <Typography sx={{ color: '#666', px: 2 }}>or</Typography>
              </Divider>

              {/* Social Login Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    borderColor: '#ddd',
                    color: '#666',
                    fontWeight: '500',
                    '&:hover': {
                      borderColor: theme.primary.main,
                      backgroundColor: 'rgba(102, 126, 234, 0.05)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ fontSize: '1.2rem' }}>🌐</Box>
                    Google
                  </Box>
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    py: 1.5,
                    borderRadius: '12px',
                    borderColor: '#ddd',
                    color: '#666',
                    fontWeight: '500',
                    '&:hover': {
                      borderColor: theme.primary.main,
                      backgroundColor: 'rgba(102, 126, 234, 0.05)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ fontSize: '1.2rem' }}>📘</Box>
                    Facebook
                  </Box>
                </Button>
              </Box>

              {/* Register Link */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: '#666' }}>
                  Don't have an account?{' '}
                  <Button
                    component={Link}
                    href="/register"
                    variant="text"
                    sx={{
                      color: theme.primary.main,
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      p: 0,
                      minWidth: 'auto',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Sign up here
                  </Button>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Paper>
      </Container>
    </Box>
  );
}
