import React from 'react';
import Login from '../../src/components/Login';
import { useRouter } from 'next/router';
import { loginUser } from '../../src/services/api';

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    try {
      const { token } = await loginUser(username, password);
      localStorage.setItem('token', token);
      router.push('/');
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  return <Login onLogin={handleLogin} />;
};

export default LoginPage;
