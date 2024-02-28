import supabase from '@/api';

export const userApi = {
  getUsers: async () => {
    const response = await supabase.auth.getUser()
    return response.data
  },
  getUserById: async (userId) => {
    const response = await supabase.get(`/users/${userId}`)
    return response.data
  },
  createPermission: async (data) => {
    const response = await supabase.from('permissions')
      .insert([data]);
    return response
  },
  getPermission: async () => {
    const response = await supabase
      .from('permissions')
      .select('*')
    return response
  },
  updatePermission: async (data) => {
    const response = await supabase
      .from('permissions')
      .update(data)
      .eq('id', data.id);
    return response
  },
  deletePermission: async (data) => {
    const response = await supabase
    .from('permissions')
    .delete()
    .eq('id', data.id);
    return response
  },
}

export default userApi