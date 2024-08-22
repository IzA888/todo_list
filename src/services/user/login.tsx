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