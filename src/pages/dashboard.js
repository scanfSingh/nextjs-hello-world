import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Container,
  Card,
  CardContent,
  Divider,
  Collapse,
  Chip,
  Avatar,
  Fade,
  Zoom,
  CircularProgress,
  Alert,
  Skeleton,
  Button
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const drawerWidth = 320;

// Modern color palette
const theme = {
  primary: {
    main: '#667eea',
    light: '#764ba2',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    dark: '#5a6fd8'
  },
  secondary: {
    main: '#f093fb',
    light: '#f5f7fa',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5f7fa 100%)'
  },
  background: {
    main: '#f8fafc',
    card: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
    sidebar: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
  }
};

// API endpoint for menu items
const MENU_ITEMS_API = '/menuItems.json';

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState('variables');
  const [openCategories, setOpenCategories] = useState({
    basics: true, // Start with basics expanded
    functions: false,
    'data-structures': false,
    advanced: false
  });
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(MENU_ITEMS_API);
        if (!response.ok) {
          throw new Error(`Failed to fetch menu items: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setMenuItems(data);
        
        // Set loading state to false after a small delay to show the loading UI
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

  const handleMenuClick = (itemId) => {
    setSelectedItem(itemId);
  };

  const handleCategoryClick = (categoryId) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Helper function to find content from nested structure
  const findContent = (itemId) => {
    for (const category of menuItems) {
      if (category.children) {
        const found = category.children.find(child => child.id === itemId);
        if (found) return found.content;
      }
    }
    return null;
  };

  const selectedContent = findContent(selectedItem);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: theme.primary.gradient,
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Toolbar sx={{ height: '70px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                width: 40,
                height: 40,
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}
            >
              JS
            </Avatar>
            <Box>
              <Typography variant="h5" noWrap component="div" sx={{ 
                fontWeight: 'bold', 
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                JavaScript Tutorial
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Learn modern JavaScript step by step
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Left Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: theme.background.sidebar,
            borderRight: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '4px 0 20px rgba(0, 0, 0, 0.08)',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ height: '70px', background: 'rgba(102, 126, 234, 0.1)', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold', 
              background: theme.primary.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              📚 Learning Path
            </Typography>
          </Box>
        </Toolbar>
        <Divider />
        
        {/* Loading State */}
        {loading && (
          <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <CircularProgress size={40} sx={{ color: theme.primary.main }} />
            <Typography sx={{ color: theme.primary.main, fontWeight: '500' }}>
              Loading tutorial topics...
            </Typography>
            {/* Loading Skeleton */}
            <Box sx={{ width: '100%', px: 2 }}>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton 
                  key={i} 
                  variant="rounded" 
                  height={50} 
                  sx={{ mb: 2, borderRadius: '12px' }} 
                  animation="wave"
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Error State */}
        {error && !loading && (
          <Box sx={{ p: 3, m: 2 }}>
            <Alert 
              severity="error" 
              sx={{ 
                borderRadius: '12px',
                '& .MuiAlert-message': {
                  width: '100%'
                }
              }}
            >
              <Typography variant="h6" gutterBottom>
                Failed to Load Topics
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
        {!loading && !error && (
          <List>
            {menuItems.map((category) => (
            <div key={category.id}>
              {/* Category Header */}
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleCategoryClick(category.id)}
                  sx={{
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                      transform: 'translateX(4px)',
                    },
                    borderRadius: '12px',
                    margin: '2px 12px',
                    padding: '12px 16px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: `2px solid ${openCategories[category.id] ? 'rgba(102, 126, 234, 0.3)' : 'transparent'}`,
                    background: openCategories[category.id] ? 'rgba(102, 126, 234, 0.05)' : 'transparent',
                  }}
                >
                  <ListItemText 
                    primary={category.title}
                    primaryTypographyProps={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      background: theme.primary.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  />
                  <Box sx={{ 
                    background: openCategories[category.id] ? theme.primary.gradient : 'rgba(0,0,0,0.3)',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'all 0.3s ease'
                  }}>
                    {openCategories[category.id] ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                  </Box>
                </ListItemButton>
              </ListItem>
              
              {/* Category Children */}
              <Collapse in={openCategories[category.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ mb: 2 }}>
                  {category.children?.map((child, index) => (
                    <Fade
                      in={openCategories[category.id]}
                      timeout={200 + index * 100}
                      key={child.id}
                    >
                      <ListItem disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                          onClick={() => handleMenuClick(child.id)}
                          selected={selectedItem === child.id}
                          sx={{
                            pl: 5, // Indent child items
                            pr: 2,
                            py: 1.5,
                            '&.Mui-selected': {
                              background: theme.primary.gradient,
                              color: 'white',
                              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                              '&:hover': {
                                background: theme.primary.gradient,
                                transform: 'translateX(2px)',
                              },
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: '20px',
                                width: '3px',
                                height: '60%',
                                background: 'white',
                                borderRadius: '2px',
                              }
                            },
                            '&:hover': {
                              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
                              transform: 'translateX(2px)',
                            },
                            borderRadius: '10px',
                            margin: '1px 16px 1px 24px',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            '&::before': {
                              content: selectedItem === child.id ? '""' : 'none',
                              position: 'absolute',
                              left: '20px',
                              width: '3px',
                              height: '60%',
                              background: 'white',
                              borderRadius: '2px',
                              transition: 'all 0.2s ease'
                            }
                          }}
                        >
                          <Box sx={{ 
                            width: '6px', 
                            height: '6px', 
                            borderRadius: '50%', 
                            background: selectedItem === child.id ? 'white' : theme.primary.main,
                            mr: 2,
                            transition: 'all 0.2s ease'
                          }} />
                          <ListItemText 
                            primary={child.title}
                            primaryTypographyProps={{
                              fontSize: '0.95rem',
                              fontWeight: selectedItem === child.id ? '600' : '500',
                              letterSpacing: '0.02em'
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </Fade>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
          </List>
        )}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          background: theme.background.main,
          p: 4,
          minHeight: '100vh',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
            zIndex: 0
          }
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Loading State for Main Content */}
          {loading && (
            <Card 
              elevation={0}
              sx={{
                background: theme.background.card,
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 25px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                p: 6
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <CircularProgress size={60} sx={{ color: theme.primary.main }} />
                <Typography variant="h5" sx={{ color: theme.primary.main, fontWeight: 'bold' }}>
                  Loading Tutorial Content...
                </Typography>
                <Box sx={{ width: '100%', maxWidth: '800px' }}>
                  <Skeleton variant="rectangular" height={200} sx={{ mb: 3, borderRadius: '16px' }} />
                  <Skeleton variant="rectangular" height={100} sx={{ mb: 2, borderRadius: '12px' }} />
                  <Skeleton variant="rectangular" height={100} sx={{ mb: 2, borderRadius: '12px' }} />
                  <Skeleton variant="rectangular" height={300} sx={{ borderRadius: '16px' }} />
                </Box>
              </Box>
            </Card>
          )}

          {/* Error State for Main Content */}
          {error && !loading && (
            <Card 
              elevation={0}
              sx={{
                background: theme.background.card,
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 25px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                p: 6
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Typography variant="h4" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                  ⚠️ Unable to Load Content
                </Typography>
                <Typography variant="h6" sx={{ color: '#666', textAlign: 'center' }}>
                  Failed to load tutorial content. Please check your connection and try again.
                </Typography>
                <Alert severity="error" sx={{ mt: 2, borderRadius: '12px' }}>
                  <Typography variant="body2">
                    {error}
                  </Typography>
                </Alert>
                <Button
                  variant="contained"
                  onClick={() => window.location.reload()}
                  sx={{
                    background: theme.primary.gradient,
                    color: 'white',
                    fontWeight: 'bold',
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                    }
                  }}
                >
                  Reload Page
                </Button>
              </Box>
            </Card>
          )}

          {/* Main Content */}
          {selectedContent && !loading && !error && (
            <Zoom in={true} timeout={300}>
              <Card 
                elevation={0}
                sx={{
                  background: theme.background.card,
                  borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 25px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {/* Header Section with Gradient */}
                <Box
                  sx={{
                    background: theme.primary.gradient,
                    p: 4,
                    color: 'white',
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
                    <Typography 
                      variant="h3" 
                      component="h1" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold',
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        mb: 2
                      }}
                    >
                      {selectedContent.title}
                    </Typography>
                    
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        opacity: 0.9,
                        fontWeight: '400',
                        lineHeight: 1.6
                      }}
                    >
                      {selectedContent.description}
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ p: 5 }}>
                  {/* Key Concepts Section */}
                  <Box sx={{ mb: 5 }}>
                    <Typography 
                      variant="h5" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold',
                        color: theme.primary.main,
                        mb: 3,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: '-8px',
                          left: 0,
                          width: '60px',
                          height: '3px',
                          background: theme.primary.gradient,
                          borderRadius: '2px'
                        }
                      }}
                    >
                      🎯 Key Concepts
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'grid', 
                      gap: 3,
                      gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                      mt: 4
                    }}>
                      {selectedContent.details.map((detail, index) => (
                        <Zoom in={true} timeout={300 + index * 100} key={index}>
                          <Paper 
                            elevation={0}
                            sx={{ 
                              p: 3,
                              borderRadius: '16px',
                              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                              border: '1px solid rgba(102, 126, 234, 0.1)',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              position: 'relative',
                              overflow: 'hidden',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.15)',
                                border: '1px solid rgba(102, 126, 234, 0.2)'
                              },
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '4px',
                                height: '100%',
                                background: theme.primary.gradient,
                                opacity: 0.8
                              }
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Box
                                sx={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '12px',
                                  background: theme.primary.gradient,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: '1.2rem',
                                  flexShrink: 0
                                }}
                              >
                                {index + 1}
                              </Box>
                              <Typography 
                                variant="body1" 
                                sx={{
                                  fontWeight: '500',
                                  color: '#2d3748',
                                  lineHeight: 1.6,
                                  fontSize: '1.05rem'
                                }}
                              >
                                {detail}
                              </Typography>
                            </Box>
                          </Paper>
                        </Zoom>
                      ))}
                    </Box>
                  </Box>
                  
                  {/* Code Example Section */}
                  {selectedContent.codeExample && (
                    <Zoom in={true} timeout={600}>
                      <Box sx={{ mt: 6 }}>
                        <Typography 
                          variant="h5" 
                          gutterBottom 
                          sx={{ 
                            fontWeight: 'bold',
                            color: theme.primary.main,
                            mb: 3,
                            position: 'relative',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              bottom: '-8px',
                              left: 0,
                              width: '60px',
                              height: '3px',
                              background: theme.primary.gradient,
                              borderRadius: '2px'
                            }
                          }}
                        >
                          💻 Code Example
                        </Typography>
                        
                        <Paper 
                          elevation={0}
                          sx={{ 
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            mt: 4
                          }}
                        >
                          {/* Code Header */}
                          <Box
                            sx={{
                              background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
                              p: 2,
                              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1
                            }}
                          >
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Box sx={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
                              <Box sx={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                              <Box sx={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28ca42' }} />
                            </Box>
                            <Typography sx={{ 
                              ml: 2, 
                              color: '#a0aec0', 
                              fontSize: '0.9rem',
                              fontFamily: 'Monaco, Consolas, monospace'
                            }}>
                              JavaScript
                            </Typography>
                          </Box>
                          
                          {/* Code Content */}
                          <Box
                            sx={{ 
                              background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
                              color: '#e2e8f0',
                              p: 4,
                              fontFamily: '"Fira Code", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                              fontSize: '0.95rem',
                              lineHeight: 1.6,
                              overflow: 'auto',
                              '& .keyword': { color: '#f56565' },
                              '& .string': { color: '#68d391' },
                              '& .comment': { color: '#a0aec0', fontStyle: 'italic' }
                            }}
                          >
                            <pre style={{ 
                              margin: 0, 
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word'
                            }}>
                              {selectedContent.codeExample}
                            </pre>
                          </Box>
                        </Paper>
                      </Box>
                    </Zoom>
                  )}
                </CardContent>
              </Card>
            </Zoom>
          )}
        </Container>
      </Box>
    </Box>
  );
}
