import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { createUser } from '../services/api';

interface createUserProps {
  oncreateUserSuccess: () => void;
}

const Create: React.FC<createUserProps> = ({ oncreateUserSuccess }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlecreateUser = async () => {
    try {
      await createUser(name, username, password);
      oncreateUserSuccess();
    } catch (e) {
      setError('Failed to create user');
    }
  };

  return (
    <div>
      <Typography variant="h4">Create Account</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handlecreateUser}>
        createUser
      </Button>
    </div>
  );
};

export default Create;
