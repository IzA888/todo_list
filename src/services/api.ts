import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Função para fazer login
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.put(`${API_URL}/user/login`, {
      username,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const token = response.data.token; // Ajuste conforme a estrutura da resposta

    if (token) {
      localStorage.setItem('token', token); // Armazena o token em localStorage
    }

    const stroedId = response.data.id;

    if (stroedId) {
      localStorage.setItem('id', stroedId)
    }

    return response.data; // Retorna os dados, que podem incluir o token JWT ou outras informações
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    throw new Error(errorMessage);
  }
};

// Função para buscar tarefas
export const fetchTasks = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data; // Retorna a lista de tarefas
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch task';
    throw new Error(errorMessage);
  }
};

// Função para criar tarefas
export const createTasks = async (title: string, token: string) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, {
      task: {
        title: title,
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data; // Retorna a tarefa criada
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
       // O servidor respondeu com um status code fora da faixa de 2xx
       console.error('Error response:', error.response.data);
       console.error('Error status:', error.response.status);
       console.error('Error headers:', error.response.headers);
       console.error('Error creating task:', error.response.data);
      throw new Error(`Failed to create task: ${error.response.data.message || 'Unknown error'}`);
    } else {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task due to an unknown error');
    }
  }
};

// Função para atualizar tarefas
export const updateTasks = async (id:number, title: string, completed: boolean, token: string) => {
  try {
    const response = await axios.patch(`${API_URL}/tasks/${id}`, {
      task: {
      title: title,
      completed: completed
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data; // Retorna a tarefa atualizada
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update todo';
    throw new Error(errorMessage);
  }
};

// Função para deletar tarefas
export const deleteTasks = async (id: number, token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data; // Retorna uma resposta de sucesso
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete task';
    throw new Error(errorMessage);;
  }
};

// Função para criar um novo usuário
export const createUser = async (name:string, username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/user`, { name, username, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Retorna o usuário criado ou uma mensagem de sucesso
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create user';
    throw new Error(errorMessage);
  }
};

// Função para buscar o perfil do usuário
export const fetchUserProfile = async (id: number, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`, {
      headers: {
 
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data; // Retorna os dados do perfil do usuário
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user';
    throw new Error(errorMessage);
  }
};
