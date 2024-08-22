import React from 'react';
import { useRouter } from 'next/router';
import Create from '../components/CreateUser';

const CreatePage: React.FC = () => {
  const router = useRouter();

  const handleCreateSuccess = () => {
    router.push('/login'); // Redireciona para a página de login após o registro
  };

  return <Create oncreateUserSuccess={handleCreateSuccess} />;
};

export default CreatePage;
