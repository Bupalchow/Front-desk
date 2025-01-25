export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    ...options.headers,
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }

    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};