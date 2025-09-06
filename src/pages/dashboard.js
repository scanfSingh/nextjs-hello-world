import React, { useState } from 'react';
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
  Zoom
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

// JavaScript Tutorial Topics Data with Nested Structure
const menuItems = [
  {
    id: 'basics',
    title: 'JavaScript Basics',
    isCategory: true,
    children: [
      {
        id: 'variables',
        title: 'Variables & Data Types',
        content: {
          title: 'JavaScript Variables & Data Types',
          description: 'Learn about different ways to declare variables and understand JavaScript data types.',
          details: [
            'var, let, and const declarations',
            'String, Number, Boolean primitives',
            'Objects and Arrays',
            'undefined and null values',
            'Symbol and BigInt types'
          ],
          codeExample: `// Variable declarations
let name = "JavaScript";
const version = 2024;
var isActive = true;

// Data types
let string = "Hello World";
let number = 42;
let boolean = true;
let array = [1, 2, 3];
let object = {key: "value"};`
        }
      },
      {
        id: 'operators',
        title: 'Operators & Expressions',
        content: {
          title: 'JavaScript Operators & Expressions',
          description: 'Master arithmetic, comparison, logical, and assignment operators.',
          details: [
            'Arithmetic operators (+, -, *, /, %)',
            'Comparison operators (==, ===, !=, !==)',
            'Logical operators (&&, ||, !)',
            'Assignment operators (=, +=, -=)',
            'Ternary operator (condition ? true : false)'
          ],
          codeExample: `// Arithmetic operators
let sum = 10 + 5;
let remainder = 10 % 3;

// Comparison operators
console.log(5 === "5"); // false (strict equality)
console.log(5 == "5");  // true (loose equality)

// Logical operators
let isAdult = age >= 18 && age <= 65;

// Ternary operator
let status = isLoggedIn ? "Welcome!" : "Please login";`
        }
      }
    ]
  },
  {
    id: 'functions',
    title: 'Functions & Scope',
    isCategory: true,
    children: [
      {
        id: 'function-basics',
        title: 'Function Declarations',
        content: {
          title: 'JavaScript Function Declarations',
          description: 'Learn different ways to declare and use functions in JavaScript.',
          details: [
            'Function declarations vs expressions',
            'Arrow functions and this binding',
            'Parameters and return values',
            'Function hoisting',
            'Anonymous functions'
          ],
          codeExample: `// Function declaration
function greet(name) {
  return "Hello, " + name;
}

// Function expression
const greet2 = function(name) {
  return "Hi, " + name;
};

// Arrow function
const greet3 = (name) => "Hey, " + name;
const add = (a, b) => a + b;`
        }
      },
      {
        id: 'closures',
        title: 'Closures & Scope',
        content: {
          title: 'JavaScript Closures & Scope',
          description: 'Understand lexical scope, closures, and variable accessibility.',
          details: [
            'Global, function, and block scope',
            'Lexical scoping rules',
            'Closure creation and uses',
            'Private variables with closures',
            'Module pattern'
          ],
          codeExample: `// Closure example
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// Private variables
function BankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit: (amount) => balance += amount,
    getBalance: () => balance
  };
}`
        }
      }
    ]
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    isCategory: true,
    children: [
      {
        id: 'arrays',
        title: 'Arrays & Methods',
        content: {
          title: 'JavaScript Arrays & Iteration Methods',
          description: 'Learn to work with arrays and master iteration methods for data manipulation.',
          details: [
            'Array creation and indexing',
            'map(), filter(), reduce() methods',
            'forEach() and for...of loops',
            'find(), some(), every() methods',
            'Array destructuring'
          ],
          codeExample: `// Array methods
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(x => x * 2);
const evens = numbers.filter(x => x % 2 === 0);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

// Destructuring
const [first, second, ...rest] = numbers;

// Find methods
const found = numbers.find(x => x > 3);
const hasEven = numbers.some(x => x % 2 === 0);`
        }
      },
      {
        id: 'objects',
        title: 'Objects & Classes',
        content: {
          title: 'JavaScript Objects & Classes',
          description: 'Understand object-oriented programming concepts in JavaScript.',
          details: [
            'Object literal syntax',
            'Constructor functions',
            'ES6 Classes',
            'Inheritance and prototypes',
            'Methods and properties'
          ],
          codeExample: `// Object literal
const person = {
  name: "John",
  age: 30,
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
};

// ES6 Class
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return \`\${this.name} makes a sound\`;
  }
}

class Dog extends Animal {
  speak() {
    return \`\${this.name} barks\`;
  }
}`
        }
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Topics',
    isCategory: true,
    children: [
      {
        id: 'async',
        title: 'Async Programming',
        content: {
          title: 'Asynchronous JavaScript',
          description: 'Master promises, async/await, and handling asynchronous operations.',
          details: [
            'Understanding the event loop',
            'Promises and Promise chaining',
            'async/await syntax',
            'Error handling with try/catch',
            'Fetch API and HTTP requests'
          ],
          codeExample: `// Promises
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("Data loaded"), 1000);
  });
};

// Async/await
async function getData() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Fetch API
async function fetchUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}`
        }
      },
      {
        id: 'dom',
        title: 'DOM Manipulation',
        content: {
          title: 'DOM Manipulation & Events',
          description: 'Learn to interact with web pages dynamically using JavaScript.',
          details: [
            'Selecting DOM elements',
            'Modifying element content and styles',
            'Event listeners and handling',
            'Creating and removing elements',
            'Form validation and submission'
          ],
          codeExample: `// DOM selection and manipulation
const element = document.getElementById('myElement');
const buttons = document.querySelectorAll('.button');

// Event handling
button.addEventListener('click', function(event) {
  event.preventDefault();
  element.textContent = 'Button clicked!';
  element.style.color = 'blue';
});

// Creating elements
const newDiv = document.createElement('div');
newDiv.className = 'new-element';
document.body.appendChild(newDiv);

// Form handling
const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);`
        }
      }
    ]
  }
];

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState('variables');
  const [openCategories, setOpenCategories] = useState({
    basics: true, // Start with basics expanded
    functions: false,
    'data-structures': false,
    advanced: false
  });

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
          {selectedContent && (
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
