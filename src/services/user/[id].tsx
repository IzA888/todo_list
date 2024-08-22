const API_URL = process.env.API_URL

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
  
