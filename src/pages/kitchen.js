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
  GlobalStyles,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  IconButton,
  Badge,
  Tooltip
} from '@mui/material';
import { 
  Schedule, 
  Restaurant, 
  LocalDining, 
  Kitchen as KitchenIcon,
  Timer,
  CheckCircle,
  RadioButtonUnchecked,
  Warning,
  PlayArrow,
  Pause,
  Done
} from '@mui/icons-material';

const theme = {
  primary: {
    main: '#667eea',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  secondary: {
    main: '#28a745',
    gradient: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
  },
  warning: {
    main: '#ffc107',
    gradient: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)',
  },
  background: {
    main: '#f8fafc',
    card: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  }
};

// API endpoint for food menu
const FOOD_MENU_API = '/foodMenu.json';

export default function Kitchen() {
  const [viewMode, setViewMode] = useState('active'); // 'active', 'today', 'all'
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [preparationStatus, setPreparationStatus] = useState({});
  const [activeTimers, setActiveTimers] = useState({});

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

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

  // Get cooking priority based on time and demand
  const getCookingPriority = (item, category) => {
    const isCurrentlyActive = isCurrentTimeInRange(category.timeRange);
    const isSpecial = item.isSpecial;
    const isToday = isItemAvailableToday(item);
    
    if (isCurrentlyActive && isToday && isSpecial) return 'high';
    if (isCurrentlyActive && isToday) return 'medium';
    if (isToday) return 'low';
    return 'none';
  };

  // Get estimated preparation time based on item complexity
  const getPrepTime = (item) => {
    const calories = item.calories;
    const ingredientCount = item.ingredients?.length || 0;
    
    if (calories > 800 || ingredientCount > 5) return 25; // Complex dishes
    if (calories > 500 || ingredientCount > 3) return 15; // Medium dishes
    return 10; // Simple dishes
  };

  // Filter items based on view mode
  const getItemsToDisplay = () => {
    let items = [];
    
    menuItems.forEach(category => {
      if (category.children) {
        category.children.forEach(item => {
          const priority = getCookingPriority(item, category);
          
          if (viewMode === 'active' && priority === 'none') return;
          if (viewMode === 'today' && !isItemAvailableToday(item)) return;
          
          items.push({
            ...item,
            category: category.title,
            categoryId: category.id,
            timeRange: category.timeRange,
            priority,
            prepTime: getPrepTime(item),
            isActive: isCurrentTimeInRange(category.timeRange)
          });
        });
      }
    });
    
    // Sort by priority and then by prep time
    return items.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return a.prepTime - b.prepTime;
    });
  };

  // Handle preparation status toggle
  const togglePreparationStatus = (itemId) => {
    setPreparationStatus(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Start/stop cooking timer
  const toggleTimer = (itemId, prepTime) => {
    setActiveTimers(prev => ({
      ...prev,
      [itemId]: prev[itemId] ? null : { startTime: Date.now(), duration: prepTime * 60 * 1000 }
    }));
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

  const displayItems = getItemsToDisplay();
  const priorityCounts = displayItems.reduce((acc, item) => {
    acc[item.priority] = (acc[item.priority] || 0) + 1;
    return acc;
  }, {});

  return (
    <Box sx={{ minHeight: '100vh', background: theme.background.main }}>
      {/* Global Styles for animations */}
      <GlobalStyles styles={{
        '@keyframes pulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 193, 7, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(255, 193, 7, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255, 193, 7, 0)' },
        },
        '@keyframes urgent': {
          '0%': { borderColor: '#dc3545' },
          '50%': { borderColor: '#fd7e14' },
          '100%': { borderColor: '#dc3545' },
        }
      }} />
      
      {/* App Bar with Kitchen Header */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          background: theme.secondary.gradient,
          boxShadow: '0 4px 20px rgba(40, 167, 69, 0.3)'
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
              👨‍🍳
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
              Kitchen Dashboard - Cook's Prep Station
            </Typography>
          </Box>
          
          {/* Kitchen Stats */}
          <Stack direction="row" spacing={2}>
            <Badge badgeContent={priorityCounts.high || 0} color="error">
              <Chip 
                label="High Priority" 
                sx={{ 
                  color: 'white', 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  fontWeight: 'bold'
                }}
              />
            </Badge>
            <Badge badgeContent={priorityCounts.medium || 0} color="warning">
              <Chip 
                label="Medium Priority" 
                sx={{ 
                  color: 'white', 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  fontWeight: 'bold'
                }}
              />
            </Badge>
            <Button 
              component={Link} 
              href="/menu" 
              sx={{ 
                color: 'white', 
                fontWeight: '500',
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Customer Menu
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Kitchen Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              background: theme.secondary.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 2
            }}
          >
            👨‍🍳 Kitchen Preparation Center
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
                border: '1px solid rgba(40, 167, 69, 0.2)',
              }}
            >
              <Schedule sx={{ color: theme.secondary.main }} />
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
                background: theme.secondary.gradient,
                color: 'white'
              }}
            >
              <KitchenIcon sx={{ fontSize: '1.5rem' }} />
              <Typography sx={{ fontWeight: '600' }}>
                Prep Schedule for {getCurrentDay()}
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* View Mode Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 1,
              borderRadius: '12px',
              background: 'white',
              border: '1px solid rgba(40, 167, 69, 0.2)'
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
                    background: theme.secondary.gradient,
                    color: 'white',
                    '&:hover': {
                      background: theme.secondary.gradient,
                    }
                  }
                }
              }}
            >
              <ToggleButton value="active">
                <Warning sx={{ mr: 1 }} />
                Active Orders
              </ToggleButton>
              <ToggleButton value="today">
                <LocalDining sx={{ mr: 1 }} />
                Today's Menu
              </ToggleButton>
              <ToggleButton value="all">
                <Restaurant sx={{ mr: 1 }} />
                All Items
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>
        </Box>

        {/* Kitchen Priority Legend */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '16px',
              background: theme.background.card,
              border: '1px solid rgba(40, 167, 69, 0.2)',
              maxWidth: '800px',
              width: '100%'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: theme.secondary.main, textAlign: 'center' }}>
              🍳 Kitchen Preparation Guide
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Box sx={{ width: 20, height: 20, borderRadius: '50%', background: '#dc3545' }} />
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>HIGH PRIORITY</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>
                  Current time window + Daily special - Prepare immediately!
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Box sx={{ width: 20, height: 20, borderRadius: '50%', background: '#ffc107' }} />
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>MEDIUM PRIORITY</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>
                  Current time window + Regular item - Prep when ready
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Box sx={{ width: 20, height: 20, borderRadius: '50%', background: '#28a745' }} />
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>LOW PRIORITY</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem' }}>
                  Available today - Prep during downtime
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, py: 8 }}>
            <CircularProgress size={50} sx={{ color: theme.secondary.main }} />
            <Typography sx={{ color: theme.secondary.main, fontWeight: '500' }}>
              Loading kitchen prep list...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {error && !loading && (
          <Box sx={{ p: 3, m: 2 }}>
            <Alert severity="error" sx={{ borderRadius: '12px' }}>
              <Typography variant="h6" gutterBottom>Kitchen System Error</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>{error}</Typography>
              <Button variant="outlined" size="small" onClick={() => window.location.reload()}>
                Retry Connection
              </Button>
            </Alert>
          </Box>
        )}

        {/* Kitchen Preparation Items */}
        {!loading && !error && (
          <Grid container spacing={3}>
            {displayItems.map((item, index) => (
              <Grid item xs={12} md={6} lg={4} key={item.id}>
                <Zoom in={true} timeout={300 + index * 50}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      borderRadius: '16px',
                      background: theme.background.card,
                      border: item.priority === 'high' ? '3px solid #dc3545' : 
                             item.priority === 'medium' ? '3px solid #ffc107' : 
                             '2px solid rgba(40, 167, 69, 0.2)',
                      transition: 'all 0.3s ease',
                      animation: item.priority === 'high' ? 'urgent 2s infinite' : 'none',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 40px rgba(40, 167, 69, 0.15)',
                      },
                      position: 'relative',
                      opacity: preparationStatus[item.id] ? 0.7 : 1
                    }}
                  >
                    {/* Priority Badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        zIndex: 2
                      }}
                    >
                      <Chip 
                        label={item.priority.toUpperCase()}
                        size="small"
                        sx={{
                          background: item.priority === 'high' ? '#dc3545' :
                                     item.priority === 'medium' ? '#ffc107' : '#28a745',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '0.7rem',
                          animation: item.priority === 'high' ? 'pulse 2s infinite' : 'none'
                        }}
                      />
                    </Box>

                    {/* Item Image/Emoji - Larger for kitchen visibility */}
                    <Box
                      sx={{
                        height: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: preparationStatus[item.id] ? 
                                   'linear-gradient(135deg, #28a745 0%, #20c997 100%)' :
                                   'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                        fontSize: '3rem',
                        position: 'relative'
                      }}
                    >
                      {preparationStatus[item.id] && (
                        <CheckCircle 
                          sx={{ 
                            position: 'absolute', 
                            top: 10, 
                            left: 10, 
                            color: 'white', 
                            fontSize: '2rem' 
                          }} 
                        />
                      )}
                      {item.image}
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      {/* Item Header with Cook Actions */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 'bold',
                              color: item.priority === 'high' ? '#dc3545' : theme.secondary.main,
                              mb: 1,
                              textDecoration: preparationStatus[item.id] ? 'line-through' : 'none'
                            }}
                          >
                            {item.title}
                          </Typography>
                          
                          {/* Category and Time Info */}
                          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                            <Chip 
                              label={item.category}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                                color: theme.secondary.main,
                                fontSize: '0.75rem'
                              }}
                            />
                            <Chip 
                              label={`${item.timeRange.start}-${item.timeRange.end}`}
                              size="small"
                              sx={{
                                backgroundColor: item.isActive ? 'rgba(255, 193, 7, 0.2)' : 'rgba(108, 117, 125, 0.1)',
                                color: item.isActive ? '#856404' : '#6c757d',
                                fontSize: '0.75rem'
                              }}
                            />
                            {item.isActive && (
                              <Chip 
                                label="ACTIVE NOW"
                                size="small"
                                sx={{
                                  backgroundColor: '#dc3545',
                                  color: 'white',
                                  fontSize: '0.75rem',
                                  fontWeight: 'bold'
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>

                      {/* Preparation Time and Status */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Timer sx={{ fontSize: '1.2rem', color: theme.secondary.main }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {item.prepTime} min prep
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ fontSize: '0.9rem', color: '#999' }}>
                            🔥 {item.calories} cal
                          </Typography>
                        </Box>
                      </Box>

                      {/* Ingredients - Prominent for Cooking */}
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: theme.secondary.main }}>
                          🧄 Required Ingredients:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {item.ingredients.map((ingredient, idx) => (
                            <Chip
                              key={idx}
                              label={ingredient}
                              size="medium"
                              sx={{
                                backgroundColor: 'rgba(40, 167, 69, 0.15)',
                                color: theme.secondary.main,
                                fontWeight: 'bold',
                                fontSize: '0.85rem'
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      {/* Cook Actions */}
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <FormControlLabel
                          control={
                            <Checkbox 
                              checked={preparationStatus[item.id] || false}
                              onChange={() => togglePreparationStatus(item.id)}
                              icon={<RadioButtonUnchecked />}
                              checkedIcon={<CheckCircle />}
                              sx={{
                                color: theme.secondary.main,
                                '&.Mui-checked': {
                                  color: theme.secondary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                              {preparationStatus[item.id] ? 'READY TO SERVE' : 'Start Prep'}
                            </Typography>
                          }
                        />
                        
                        <Tooltip title={activeTimers[item.id] ? 'Stop Timer' : 'Start Prep Timer'}>
                          <IconButton
                            onClick={() => toggleTimer(item.id, item.prepTime)}
                            sx={{
                              color: activeTimers[item.id] ? '#dc3545' : theme.secondary.main,
                              border: `2px solid ${activeTimers[item.id] ? '#dc3545' : theme.secondary.main}`,
                              borderRadius: '8px'
                            }}
                          >
                            {activeTimers[item.id] ? <Pause /> : <PlayArrow />}
                          </IconButton>
                        </Tooltip>
                      </Box>

                      {/* Timer Progress */}
                      {activeTimers[item.id] && (
                        <Box sx={{ mt: 2 }}>
                          <LinearProgress 
                            variant="determinate"
                            value={Math.min(100, ((Date.now() - activeTimers[item.id].startTime) / activeTimers[item.id].duration) * 100)}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              '& .MuiLinearProgress-bar': {
                                background: theme.secondary.gradient
                              }
                            }}
                          />
                          <Typography variant="body2" sx={{ textAlign: 'center', mt: 1, fontWeight: 'bold' }}>
                            Cooking in progress...
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        )}

        {/* No Items Message */}
        {!loading && !error && displayItems.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#666' }}>
              No items to prepare right now
            </Typography>
            <Typography sx={{ color: '#999', mb: 4 }}>
              Kitchen is all caught up! Check back later or view all items.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
