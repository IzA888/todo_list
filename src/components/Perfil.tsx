import React, { useEffect, useState } from 'react';
import { Typography, Button, Container } from '@mui/material';
import { fetchUserProfile } from '../services/api';

const Perfil: React.FC = () => {
  const [perfil, setProfile] = useState<{ username: string; name: string } | null>(null);
  const [error, setError] = useState<string>('');
  const [id, setId] = useState<number | null>(null); // Adicione o ID conforme necessário

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id'); // Supondo que o ID do usuário esteja armazenado no localStorage

    if (token && userId) {
      setId(parseInt(userId)); // Converta o ID do usuário para número
    }
  }, []);

  useEffect(() => {
    if (id !== null) {
      const token = localStorage.getItem('token');
      if (token) {
        fetchUserProfile(id, token)
          .then((data) => setProfile(data))
          .catch(() => setError('Failed to load profile'));
      }
    }
  }, [id]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    window.location.href = '/user/login';
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      {perfil ? (
        <div>
          <Typography variant="h4">User Profile</Typography>
          <Typography variant="body1">Name: {perfil.name}</Typography>
          <Typography variant="body1">Username: {perfil.username}</Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <Typography>Loading...</Typography>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default Perfil;
