import React, { useEffect, useState } from 'react';
import HandleTarefa from '../../src/components/HandleTarefas';
import { useRouter } from 'next/router';
import { fetchTasks, createTasks } from '../../src/services/api';
import { Tasks } from '../../src/dashboard/Tasks';

const Home: React.FC = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const handleAddTasks = async (title: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      const newTasks: Tasks = await createTasks(title, token);
      setTasks([...tasks, newTasks]);
    }
  };

  return isAuthenticated ? (
    <HandleTarefa tasks={tasks} setTasks={setTasks} onAddTasks={handleAddTasks} />
  ) : null;
};

export default Home;
