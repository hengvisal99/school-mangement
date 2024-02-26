import supabase from '@/api';

export const getUsers = async () => {
  return supabase.get('/users');
};

export const getUserById = async (userId) => {
  return supabase.get(`/users/${userId}`);
};

// Other API functions...
