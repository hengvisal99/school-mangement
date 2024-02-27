
import { supabase } from '../../supabase/supabase';
import router from '../../router/index';
import store from "../store";
export const actions = {
  async login({ commit }, { email, password, remember_me }) {
    commit('setLoading', true);
    const { data: { user, session }, error } = await supabase.auth.signInWithPassword({ email, password })
    if (session) {

      commit('setUser', session.user);
      commit('setToken', session.access_token);
      commit('setLoginError', error);

      const routeName = store.state.redirectedFrom || "/school";
      let expires_at = session.expires_at;
      if (remember_me) {
        const threeDaysInSeconds = 3 * 24 * 60 * 60; // Convert 3 days to seconds
        expires_at += threeDaysInSeconds; // Add 3 days in seconds
      }
      localStorage.setItem('expires_at', expires_at);
      router.push(routeName)
    }
    else if (error) {
      commit('setLoginError', error)
    }
    commit('setLoading', false);
  },
  async refreshLogin({ commit }, session) {
    const token = session.access_token;
    const currentTime = Math.floor(Date.now() / 1000);
    const expires_at = localStorage.getItem('expires_at')

    commit('setUser', session)
    commit('setToken', token)
    if (expires_at < currentTime) {
      const { error } = await supabase.auth.signOut();
      if (error == null) {
        localStorage.removeItem('expires_at');
        router.push('login')
      }
    } else {
      console.log("Token is still valid");
    }
  }
};
