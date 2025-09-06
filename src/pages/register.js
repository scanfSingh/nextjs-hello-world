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
  Paper,
  Grid
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
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

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'agreeTerms' ? checked : value
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
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log('Registration submitted:', formData);
      setIsSubmitting(false);
      // In real app, handle registration success/failure here
    }, 1500);
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

      <Container maxWidth="md">
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
                ✨
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                Create Account
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Join our JavaScript learning community today
              </Typography>
            </Box>
          </Box>

          {/* Form */}
          <CardContent sx={{ p: 6 }}>
            <Box component="form" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    sx={{
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
                          <Person sx={{ color: theme.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    sx={{
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
                          <Person sx={{ color: theme.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

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

              {/* Password Fields */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    sx={{
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
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            sx={{ color: theme.primary.main }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              {/* Terms Agreement */}
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    sx={{
                      color: theme.primary.main,
                      '&.Mui-checked': {
                        color: theme.primary.main,
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: '0.9rem', color: errors.agreeTerms ? '#d32f2f' : 'inherit' }}>
                    I agree to the{' '}
                    <Button
                      variant="text"
                      sx={{
                        color: theme.primary.main,
                        fontWeight: '500',
                        textDecoration: 'underline',
                        p: 0,
                        minWidth: 'auto',
                        fontSize: '0.9rem',
                        '&:hover': {
                          backgroundColor: 'transparent',
                        }
                      }}
                    >
                      Terms and Conditions
                    </Button>
                    {' '}and{' '}
                    <Button
                      variant="text"
                      sx={{
                        color: theme.primary.main,
                        fontWeight: '500',
                        textDecoration: 'underline',
                        p: 0,
                        minWidth: 'auto',
                        fontSize: '0.9rem',
                        '&:hover': {
                          backgroundColor: 'transparent',
                        }
                      }}
                    >
                      Privacy Policy
                    </Button>
                  </Typography>
                }
                sx={{ mb: 4, alignItems: 'flex-start' }}
              />
              {errors.agreeTerms && (
                <Typography sx={{ color: '#d32f2f', fontSize: '0.75rem', mb: 2, ml: 2 }}>
                  {errors.agreeTerms}
                </Typography>
              )}

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
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>

              {/* Divider */}
              <Divider sx={{ mb: 3 }}>
                <Typography sx={{ color: '#666', px: 2 }}>or</Typography>
              </Divider>

              {/* Social Registration Buttons */}
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
                    Sign up with Google
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
                    Sign up with Facebook
                  </Box>
                </Button>
              </Box>

              {/* Login Link */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: '#666' }}>
                  Already have an account?{' '}
                  <Button
                    component={Link}
                    href="/login"
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
                    Sign in here
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
