import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { fetchUserProfile } from '../services/api';

const Perfil: React.FC = () => {
  const [perfil, setProfile] = useState<{ username:string } | null>(null);
  const [error, setError] = useState('');
  const [id, setId] = useState<number | null>(null); // Adicione um estado para o id

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && id !== null) {
      fetchUserProfile(id, token)
        .then((data) => setProfile(data))
        .catch(() => setError('Failed to load profile'));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return perfil ? (
    <div>
      <Typography variant="h4">User Profile</Typography>
      <Typography variant="body1">Username: {perfil.username}</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  ) : (
    <Typography>Loading...</Typography>
  );
};

export default Perfil;
