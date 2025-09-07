import React, { useState, useEffect } from 'react';
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  Stack,
  Avatar,
  Paper,
  Grid,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Fade,
  Zoom,
  CircularProgress,
  Alert,
  Divider,
  GlobalStyles
} from '@mui/material';
import { Schedule, Restaurant, LocalDining } from '@mui/icons-material';

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

// API endpoint for food menu
const FOOD_MENU_API = '/foodMenu.json';

export default function Menu() {
  const [viewMode, setViewMode] = useState('today'); // 'today' or 'full'
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Fetch menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(FOOD_MENU_API);
        if (!response.ok) {
          throw new Error(`Failed to fetch menu items: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setMenuItems(data);
        
        setTimeout(() => {
          setLoading(false);
        }, 500);
        
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Helper function to check if current time falls within menu time range
  const isCurrentTimeInRange = (timeRange) => {
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeMinutes = currentHour * 60 + currentMinute;

    const [startHour, startMinute] = timeRange.start.split(':').map(Number);
    const [endHour, endMinute] = timeRange.end.split(':').map(Number);
    
    const startTimeMinutes = startHour * 60 + startMinute;
    let endTimeMinutes = endHour * 60 + endMinute;
    
    // Handle overnight periods (like late night menu)
    if (endTimeMinutes < startTimeMinutes) {
      // If current time is after start time or before end time
      return currentTimeMinutes >= startTimeMinutes || currentTimeMinutes <= endTimeMinutes;
    }
    
    return currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes;
  };

  // Helper function to check if item is available on current day
  const isItemAvailableToday = (item) => {
    const today = currentTime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return item.availableDays?.includes(today) || false;
  };

  // Get current day name
  const getCurrentDay = () => {
    return currentTime.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Filter menu items based on current day
  const filterItemsByDay = (items) => {
    return items.filter(item => isItemAvailableToday(item));
  };

  // Get current active menu category based on time
  const getCurrentMenuCategory = () => {
    return menuItems.find(category => isCurrentTimeInRange(category.timeRange));
  };

  // Get menu items to display based on view mode
  const getMenuItemsToDisplay = () => {
    if (viewMode === 'full') {
      return menuItems;
    } else {
      const currentCategory = getCurrentMenuCategory();
      if (!currentCategory) return [];
      
      // Filter items based on current day
      const filteredCategory = {
        ...currentCategory,
        children: filterItemsByDay(currentCategory.children || [])
      };
      
      return [filteredCategory];
    }
  };

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const formatTime = (time) => {
    return new Date().toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const displayItems = getMenuItemsToDisplay();

  return (
    <Box sx={{ minHeight: '100vh', background: theme.background.main }}>
      {/* Global Styles for animations */}
      <GlobalStyles styles={{
        '@keyframes pulse': {
          '0%': {
            boxShadow: '0 0 0 0 rgba(255, 107, 53, 0.7)',
          },
          '70%': {
            boxShadow: '0 0 0 10px rgba(255, 107, 53, 0)',
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(255, 107, 53, 0)',
          },
        }
      }} />
      {/* App Bar with Menu */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          background: theme.primary.gradient,
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <Avatar
              sx={{
                background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                width: 40,
                height: 40,
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}
            >
              🍽️
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
              Food Menu
            </Typography>
          </Box>
          
          {/* Navigation Menu */}
          <Stack direction="row" spacing={2}>
            <Button 
              component={Link} 
              href="/" 
              sx={{ 
                color: 'white', 
                fontWeight: '500',
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Home
            </Button>
            <Button 
              component={Link} 
              href="/kitchen" 
              variant="contained"
              sx={{ 
                backgroundColor: 'rgba(40, 167, 69, 0.9)',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': { 
                  backgroundColor: '#28a745',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(40, 167, 69, 0.4)'
                },
                transition: 'all 0.2s ease',
                borderRadius: '8px'
              }}
            >
              👨‍🍳 Kitchen
            </Button>
            <Button 
              component={Link} 
              href="/dashboard" 
              sx={{ 
                color: 'white', 
                fontWeight: '500',
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Dashboard
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              background: theme.primary.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 2
            }}
          >
            Our Delicious Menu
          </Typography>
          
          {/* Current Time and Day Display */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, justifyContent: 'center', mb: 4 }}>
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: '12px',
                background: theme.background.card,
                border: '1px solid rgba(102, 126, 234, 0.1)',
              }}
            >
              <Schedule sx={{ color: theme.primary.main }} />
              <Typography sx={{ fontWeight: '500', color: '#666' }}>
                {formatTime(currentTime)}
              </Typography>
            </Paper>
            
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: '12px',
                background: theme.primary.gradient,
                color: 'white'
              }}
            >
              <Typography sx={{ fontSize: '1.2rem' }}>📅</Typography>
              <Typography sx={{ fontWeight: '600' }}>
                Today is {getCurrentDay()}
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* View Mode Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 1,
              borderRadius: '12px',
              background: 'white',
              border: '1px solid rgba(102, 126, 234, 0.1)'
            }}
          >
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              sx={{
                '& .MuiToggleButton-root': {
                  border: 'none',
                  borderRadius: '8px',
                  px: 3,
                  py: 1,
                  fontWeight: '600',
                  '&.Mui-selected': {
                    background: theme.primary.gradient,
                    color: 'white',
                    '&:hover': {
                      background: theme.primary.gradient,
                    }
                  }
                }
              }}
            >
              <ToggleButton value="today">
                <LocalDining sx={{ mr: 1 }} />
                Today's Menu
              </ToggleButton>
              <ToggleButton value="full">
                <Restaurant sx={{ mr: 1 }} />
                Full Menu
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>
        </Box>

        {/* Menu Legend/Info */}
        {!loading && !error && viewMode === 'today' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: '12px',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(102, 126, 234, 0.1)',
                maxWidth: '600px'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.primary.main, textAlign: 'center' }}>
                📋 Today's Menu Guide
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    label="Daily Special"
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.7rem'
                    }}
                  />
                  <Typography variant="body2" sx={{ color: '#666' }}>Only today</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    label="Regular Item"
                    size="small"
                    sx={{
                      background: theme.primary.gradient,
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.7rem'
                    }}
                  />
                  <Typography variant="body2" sx={{ color: '#666' }}>Available multiple days</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        )}

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 8 }}>
            <CircularProgress size={50} sx={{ color: theme.primary.main }} />
            <Typography sx={{ color: theme.primary.main, fontWeight: '500' }}>
              Loading delicious menu items...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {error && !loading && (
          <Box sx={{ p: 3, m: 2 }}>
            <Alert 
              severity="error" 
              sx={{ borderRadius: '12px' }}
            >
              <Typography variant="h6" gutterBottom>
                Failed to Load Menu
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {error}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => window.location.reload()}
                sx={{
                  borderColor: '#d32f2f',
                  color: '#d32f2f',
                  '&:hover': {
                    borderColor: '#d32f2f',
                    backgroundColor: 'rgba(211, 47, 47, 0.04)'
                  }
                }}
              >
                Retry
              </Button>
            </Alert>
          </Box>
        )}

        {/* Menu Items */}
        {!loading && !error && displayItems.length === 0 && viewMode === 'today' && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#666' }}>
              No menu available right now
            </Typography>
            <Typography sx={{ color: '#999', mb: 4 }}>
              Our kitchen might be closed, or there are no special items available for {getCurrentDay()}. 
              <br />
              Check out our full menu to see all available options!
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => setViewMode('full')}
              sx={{
                borderColor: theme.primary.main,
                color: theme.primary.main,
                '&:hover': {
                  background: theme.primary.gradient,
                  color: 'white',
                  borderColor: 'transparent'
                }
              }}
            >
              View Full Menu
            </Button>
          </Box>
        )}

        {/* Menu Items - Display Category Level Message */}
        {!loading && !error && displayItems.length > 0 && displayItems[0].children.length === 0 && viewMode === 'today' && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#666' }}>
              No special items for {getCurrentDay()}
            </Typography>
            <Typography sx={{ color: '#999', mb: 4 }}>
              Today's menu doesn't have any special items available, but don't worry!
              <br />
              View our full menu to see all the delicious options we have.
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => setViewMode('full')}
              sx={{
                borderColor: theme.primary.main,
                color: theme.primary.main,
                '&:hover': {
                  background: theme.primary.gradient,
                  color: 'white',
                  borderColor: 'transparent'
                }
              }}
            >
              View Full Menu
            </Button>
          </Box>
        )}

        {/* Menu Categories and Items */}
        {!loading && !error && displayItems.map((category, categoryIndex) => (
          <Zoom in={true} timeout={300 + categoryIndex * 100} key={category.id}>
            <Box sx={{ mb: 6 }}>
              {/* Category Header */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: '20px',
                  background: theme.primary.gradient,
                  color: 'white',
                  mb: 4,
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
                <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Typography sx={{ fontSize: '3rem' }}>{category.emoji}</Typography>
                  <Box>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontWeight: 'bold',
                        mb: 1,
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      {category.title}
                    </Typography>
                    <Typography sx={{ opacity: 0.9, fontSize: '1.1rem' }}>
                      Available {category.timeRange.start} - {category.timeRange.end}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                      {viewMode === 'today' && isCurrentTimeInRange(category.timeRange) && (
                        <Chip 
                          label="Currently Available" 
                          sx={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                      )}
                      {viewMode === 'today' && (
                        <Chip 
                          label={`${category.children.length} items available today`}
                          sx={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Paper>

              {/* Menu Items Grid */}
              <Grid container spacing={3}>
                {category.children?.map((item, itemIndex) => (
                  <Grid item xs={12} sm={6} lg={4} key={item.id}>
                    <Fade in={true} timeout={500 + itemIndex * 100}>
                      <Card
                        elevation={0}
                        sx={{
                          height: '100%',
                          borderRadius: '16px',
                          background: theme.background.card,
                          border: '1px solid rgba(102, 126, 234, 0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
                            border: '1px solid rgba(102, 126, 234, 0.2)'
                          }
                        }}
                      >
                        {/* Item Image/Emoji */}
                        <Box
                          sx={{
                            height: 120,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                            fontSize: '4rem'
                          }}
                        >
                          {item.image}
                        </Box>

                        <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                          {/* Item Header */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontWeight: 'bold',
                                  color: theme.primary.main,
                                  mb: 1
                                }}
                              >
                                {item.title}
                              </Typography>
                              {item.isSpecial && (
                                <Chip 
                                  label={item.specialNote}
                                  size="small"
                                  sx={{
                                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.7rem',
                                    animation: 'pulse 2s infinite'
                                  }}
                                />
                              )}
                            </Box>
                            <Chip 
                              label={item.price}
                              sx={{
                                background: item.isSpecial ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)' : theme.primary.gradient,
                                color: 'white',
                                fontWeight: 'bold',
                                ml: 1
                              }}
                            />
                          </Box>

                          {/* Description */}
                          <Typography 
                            sx={{ 
                              color: '#666',
                              mb: 2,
                              flexGrow: 1,
                              lineHeight: 1.6
                            }}
                          >
                            {item.description}
                          </Typography>

                          {/* Calories */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <Typography sx={{ fontSize: '0.9rem', color: '#999' }}>
                              🔥 {item.calories} calories
                            </Typography>
                          </Box>

                          <Divider sx={{ my: 2 }} />

                          {/* Ingredients */}
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: theme.primary.main }}>
                            Ingredients:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {item.ingredients.map((ingredient, idx) => (
                              <Chip
                                key={idx}
                                label={ingredient}
                                size="small"
                                sx={{
                                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                  color: theme.primary.main,
                                  fontSize: '0.75rem'
                                }}
                              />
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Zoom>
        ))}
      </Container>
    </Box>
  );
}
