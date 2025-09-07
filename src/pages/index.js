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
  Paper
} from '@mui/material';

const theme = {
  primary: {
    main: '#667eea',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  background: {
    main: '#f8fafc',
  }
};

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', background: theme.background.main }}>
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
              JS
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
              JavaScript Learning Platform
            </Typography>
          </Box>
          
          {/* Navigation Menu */}
          <Stack direction="row" spacing={2}>
            <Button 
              component={Link} 
              href="/about" 
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
              About
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
            <Button 
              component={Link} 
              href="/menu" 
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
              Menu
            </Button>
            <Button 
              component={Link} 
              href="/kitchen" 
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
              Kitchen
            </Button>
            <Button 
              component={Link} 
              href="/login" 
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
              Login
            </Button>
            <Button 
              component={Link} 
              href="/register" 
              variant="contained"
              sx={{ 
                backgroundColor: 'white',
                color: theme.primary.main,
                fontWeight: 'bold',
                '&:hover': { 
                  backgroundColor: '#f0f0f0',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                },
                transition: 'all 0.2s ease',
                borderRadius: '8px'
              }}
            >
              Register
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
              mb: 3
            }}
          >
            Menu and Title
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#666',
              mb: 4,
              fontWeight: '400',
              lineHeight: 1.6
            }}
          >
            Welcome to the JavaScript Learning Platform
            <br />
            Master modern JavaScript with our interactive tutorials
          </Typography>
        </Box>

        {/* Feature Cards */}
        <Box sx={{ 
          display: 'grid', 
          gap: 4,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' },
          mb: 6
        }}>
          {/* Dashboard Card */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '20px',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid rgba(102, 126, 234, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15)',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }
            }}
          >
            <Box sx={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: theme.primary.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3
            }}>
              <Typography sx={{ fontSize: '2rem' }}>📚</Typography>
            </Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.primary.main }}>
              Interactive Dashboard
            </Typography>
            <Typography sx={{ color: '#666', mb: 3, lineHeight: 1.6 }}>
              Learn JavaScript with our beautifully designed tutorial dashboard featuring nested topics and code examples.
            </Typography>
            <Button 
              component={Link} 
              href="/dashboard"
              variant="outlined"
              sx={{
                borderColor: theme.primary.main,
                color: theme.primary.main,
                fontWeight: '600',
                '&:hover': {
                  background: theme.primary.gradient,
                  color: 'white',
                  borderColor: 'transparent'
                }
              }}
            >
              Start Learning
            </Button>
          </Paper>

          {/* Menu Card */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '20px',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid rgba(102, 126, 234, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15)',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }
            }}
          >
            <Box sx={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: theme.primary.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3
            }}>
              <Typography sx={{ fontSize: '2rem' }}>🍽️</Typography>
            </Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.primary.main }}>
              Food Menu
            </Typography>
            <Typography sx={{ color: '#666', mb: 3, lineHeight: 1.6 }}>
              Discover our delicious menu with time-based recommendations. View today's specials or browse the full menu.
            </Typography>
            <Button 
              component={Link} 
              href="/menu"
              variant="outlined"
              sx={{
                borderColor: theme.primary.main,
                color: theme.primary.main,
                fontWeight: '600',
                '&:hover': {
                  background: theme.primary.gradient,
                  color: 'white',
                  borderColor: 'transparent'
                }
              }}
            >
              View Menu
            </Button>
          </Paper>

          {/* Kitchen Card */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '20px',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid rgba(40, 167, 69, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 60px rgba(40, 167, 69, 0.15)',
                border: '1px solid rgba(40, 167, 69, 0.3)'
              }
            }}
          >
            <Box sx={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3
            }}>
              <Typography sx={{ fontSize: '2rem' }}>👨‍🍳</Typography>
            </Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#28a745' }}>
              Kitchen Dashboard
            </Typography>
            <Typography sx={{ color: '#666', mb: 3, lineHeight: 1.6 }}>
              Cook's preparation center with priority orders, ingredient lists, and cooking timers for efficient food prep.
            </Typography>
            <Button 
              component={Link} 
              href="/kitchen"
              variant="outlined"
              sx={{
                borderColor: '#28a745',
                color: '#28a745',
                fontWeight: '600',
                '&:hover': {
                  background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                  color: 'white',
                  borderColor: 'transparent'
                }
              }}
            >
              Open Kitchen
            </Button>
          </Paper>

          {/* Login Card */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '20px',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid rgba(102, 126, 234, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15)',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }
            }}
          >
            <Box sx={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: theme.primary.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3
            }}>
              <Typography sx={{ fontSize: '2rem' }}>🔑</Typography>
            </Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.primary.main }}>
              User Login
            </Typography>
            <Typography sx={{ color: '#666', mb: 3, lineHeight: 1.6 }}>
              Access your personalized learning journey and track your progress through our platform.
            </Typography>
            <Button 
              component={Link} 
              href="/login"
              variant="outlined"
              sx={{
                borderColor: theme.primary.main,
                color: theme.primary.main,
                fontWeight: '600',
                '&:hover': {
                  background: theme.primary.gradient,
                  color: 'white',
                  borderColor: 'transparent'
                }
              }}
            >
              Sign In
            </Button>
          </Paper>

          {/* Register Card */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '20px',
              background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid rgba(102, 126, 234, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15)',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }
            }}
          >
            <Box sx={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: theme.primary.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3
            }}>
              <Typography sx={{ fontSize: '2rem' }}>✨</Typography>
            </Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.primary.main }}>
              Create Account
            </Typography>
            <Typography sx={{ color: '#666', mb: 3, lineHeight: 1.6 }}>
              Join our community of JavaScript learners and start your coding journey today.
            </Typography>
            <Button 
              component={Link} 
              href="/register"
              variant="contained"
              sx={{
                background: theme.primary.gradient,
                color: 'white',
                fontWeight: '600',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                }
              }}
            >
              Get Started
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
