const API_URL = process.env.API_URL

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