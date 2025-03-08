// src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper
} from '@mui/material';

export default function Register() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (password !== passwordConfirm) {
      return setError('كلمات المرور غير متطابقة');
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/');
    } catch (error: any) {
      console.error(error);
      setError('فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.');
    }
    
    setLoading(false);
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4, direction: 'rtl' }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            {t('register.title', 'إنشاء حساب جديد')}
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label={t('register.email', 'البريد الإلكتروني')}
              type="email"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{ dir: 'rtl' }}
            />
            
            <TextField
              label={t('register.password', 'كلمة المرور')}
              type="password"
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ dir: 'rtl' }}
            />
            
            <TextField
              label={t('register.confirmPassword', 'تأكيد كلمة المرور')}
              type="password"
              fullWidth
              margin="normal"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              inputProps={{ dir: 'rtl' }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {t('register.submit', 'إنشاء حساب')}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}