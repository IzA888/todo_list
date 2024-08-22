const API_URL = process.env.API_URL

export const loginUser = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json(); // Retorna o token JWT
};

export const fetchTasks = async (token: string) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  return response.json(); // Retorna a lista de tarefas
};

export const createTasks = async (title: string, token: string) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error('Failed to create todo');
  }

  return response.json(); // Retorna a tarefa criada
};

export const updateTasks = async (id: number, title: string, token: string) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error('Failed to update todo');
  }

  return response.json(); // Retorna a tarefa atualizada
};

export const deleteTasks = async (id: number, token: string) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }

  return response.json(); // Retorna uma resposta de sucesso
};

// Função para criar um novo usuário
export const createUser = async (username: string, password: string) => {
  const response = await fetch(`/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json(); // Retorna o usuário criado ou uma mensagem de sucesso
};

// Função para buscar o perfil do usuário
export const fetchUserProfile = async (id:number, token: string) => {
  const response = await fetch(`${API_URL}/user/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json(); // Retorna os dados do perfil do usuário
};
