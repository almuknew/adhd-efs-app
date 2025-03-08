// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Typography, Grid, Paper, Box, Button, List, 
  ListItem, ListItemText, ListItemIcon, Divider,
  Card, CardContent, CardActions, CircularProgress
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TimerIcon from '@mui/icons-material/Timer';
import BookIcon from '@mui/icons-material/Book';
import AddIcon from '@mui/icons-material/Add';

// Temporary mock data
const mockTasks = [
  { id: 1, title: 'إتمام المشروع النهائي', dueDate: '2025-03-15', priority: 'high', completed: false },
  { id: 2, title: 'قراءة الفصل الخامس', dueDate: '2025-03-12', priority: 'medium', completed: false },
  { id: 3, title: 'كتابة الملخص', dueDate: '2025-03-10', priority: 'low', completed: true },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // In a real app, we would fetch this data from Firebase
  const [tasks, setTasks] = useState(mockTasks);
  
  // Priority colors
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#757575';
    }
  };

  const startFocusSession = () => {
    navigate('/focus');
  };

  return (
    <Box sx={{ direction: 'rtl' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('dashboard.title', 'لوحة التحكم')}
      </Typography>
      
      <Grid container spacing={3}>
        {/* Today's Tasks */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {t('dashboard.todayTasks', 'مهام اليوم')}
              </Typography>
              <Button 
                startIcon={<AddIcon />} 
                variant="outlined" 
                size="small"
                onClick={() => navigate('/tasks/new')}
              >
                {t('dashboard.addTask', 'إضافة مهمة')}
              </Button>
            </Box>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <List>
                {tasks.filter(task => !task.completed).map((task) => (
                  <ListItem 
                    key={task.id}
                    button
                    onClick={() => navigate(`/tasks/${task.id}`)}
                    sx={{ 
                      mb: 1, 
                      borderRight: `4px solid ${getPriorityColor(task.priority)}`,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                    }}
                  >
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={task.title}
                      secondary={`تاريخ الاستحقاق: ${task.dueDate}`}
                    />
                  </ListItem>
                ))}
                {tasks.filter(task => !task.completed).length === 0 && (
                  <Typography sx={{ textAlign: 'center', p: 2, color: 'text.secondary' }}>
                    {t('dashboard.noTasks', 'لا توجد مهام لليوم')}
                  </Typography>
                )}
              </List>
            )}
          </Paper>
        </Grid>
        
        {/* Focus Session Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('dashboard.focus', 'حصة تركيز')}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {t('dashboard.focusDescription', 'تساعدك جلسات التركيز على إكمال المهام بتركيز أفضل. اختر مهمة وابدأ جلسة تركيز الآن.')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                <TimerIcon sx={{ width: 80, height: 80, color: 'primary.main', opacity: 0.7 }} />
              </Box>
            </CardContent>
            <CardActions>
              <Button 
                variant="contained" 
                fullWidth
                onClick={startFocusSession}
              >
                {t('dashboard.startFocus', 'ابدأ حصة تركيز')}
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        {/* Upcoming Tasks */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('dashboard.upcomingTasks', 'المهام القادمة')}
            </Typography>
            
            <List>
              {tasks.filter(task => !task.completed).slice(0, 3).map((task) => (
                <ListItem 
                  key={task.id}
                  sx={{ 
                    borderBottom: '1px solid #eee',
                    py: 1,
                  }}
                >
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={task.title}
                    secondary={`تاريخ الاستحقاق: ${task.dueDate}`}
                  />
                </ListItem>
              ))}
            </List>
            
            <Button 
              fullWidth 
              variant="text" 
              sx={{ mt: 2 }}
              onClick={() => navigate('/tasks')}
            >
              {t('dashboard.viewAllTasks', 'عرض جميع المهام')}
            </Button>
          </Paper>
        </Grid>
        
        {/* Course Materials */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('dashboard.courseMaterials', 'مدونة المقررات')}
            </Typography>
            
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<BookIcon />}
              sx={{ mt: 2 }}
              onClick={() => navigate('/courses')}
            >
              {t('dashboard.viewCourseMaterials', 'عرض مدونة المقررات')}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}