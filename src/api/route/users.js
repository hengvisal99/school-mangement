import supabase from '@/api/supabase';

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
      .insert([data])
      .select();
    return response
  },
  getPermission: async () => {
    const response = await supabase
      .from('permissions')
      .select('*')
      .order('created_at', { ascending: true })
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
    console.log('req', response)
    return response
  },
  createRole: async (data) => {
    const response = await supabase.from('roles')
      .insert([{ name: data }])
      .select()

    return response
  },
  getRoleId: async () => {
    const response = await supabase
      .from('roles')
      .select('*')
      .eq('id', roleId);
    return response
  },
  createRolePermission: async (data) => {
    const response = await supabase.from('role_permissions')
      .insert(data)
      .select()
    return response
  },
  createRolePermission: async (data) => {
    const response = await supabase.from('role_permissions')
      .insert(data)
      .select(
        `
        *,
        roles:id(id),
        permissions:id(id)
      `
      )
      .eq('role_id', data.roleId)
      .eq('permission_id', data.permissionId);
    return response
  },
  getRole: async () => {
    let response = await supabase
      .rpc('get_role_permissions')

    return response;
  },
}
export default userApi 