import React, { useEffect, useState } from 'react';
import HandleTarefa from '../components/HandleTarefas';
import { useRouter } from 'next/router';
import { fetchTasks} from '../services/api';
import { Tasks } from '../dashboard/Tasks';
import { title } from 'process';


const Home: React.FC = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string>('');
 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      loadTasks(token);
    }
  }, [router]);

  const loadTasks = async (token: string) => {
    try {
      const tasks = await fetchTasks(token);
      setTasks(tasks);
    } catch (error) {
      console.error('Failed to load tasks', error);
      router.push('/login');
    }
  };

  
  return isAuthenticated ? (
    <div>
      <HandleTarefa tasks={tasks} setTasks={setTasks} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  ) : null;
};

export default Home;
