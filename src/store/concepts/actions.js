
import { supabase } from '../../supabase/supabase';
import router from '../../router/index';
import store from "../store";
export const actions = {
  async login({ commit }, { email, password }) {
    commit('setLoading', true);
    const { data: { user, session }, error } = await supabase.auth.signInWithPassword({ email, password })
    console.log('session', session);
    console.log('user', user);
    if (session) {
      // commit('setUser', session.user);
      commit('setToken', session.access_token);
      commit('setLoginError', error);

      const routeName = store.state.redirectedFrom || "/school";
      console.log('route name',routeName)
      router.push(routeName)
      localStorage.setItem('token',session.access_token)
    }
    else if (error) {
      commit('setLoginError', error)
    }
    commit('setLoading', false);
  },
};
