import { useRouter } from 'next/router';
import Login from '@/src/components/Login';

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('token', token); // Armazena o token no localStorage
    router.push('/'); // Redireciona para a página inicial após o login
  };

  return (
    <Login onLoginSuccess={handleLoginSuccess} />
  );
}
