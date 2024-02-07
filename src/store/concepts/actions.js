
import { supabase } from '../../supabase/supabase';
export const actions = {
  async login({ commit }, { email, password }) {
    commit('setLoading', true);
    const {data: { user , session } , error} = await supabase.auth.signInWithPassword({ email, password })
    console.log('session',session)
    console.log('user',user)
    if (session) {
      commit('setUser', session.user)
      commit('setToken', session.access_token)
      commit('setLoginError', error)
    }
    else if (error) {
      commit('setLoginError', error)
    }
    commit('setLoading', false);
  },
};
