
import { supabase } from '../../supabase/supabase';
import router from '../../router/index';
import store from "../store";
import { jwtDecode } from "jwt-decode";
export const actions = {
  async login({ commit }, { email, password }) {
    commit('setLoading', true);
    const { data: { user, session }, error } = await supabase.auth.signInWithPassword({ email, password })
    if (session) {
      commit('setUser', session.user);
      commit('setToken', session.access_token);
      commit('setLoginError', error);

      const routeName = store.state.redirectedFrom || "/school";
      console.log('route name',routeName)
      router.push(routeName)
    }
    else if (error) {
      commit('setLoginError', error)
    }
    commit('setLoading', false);
  },
  refreshLogin({ commit }, session) {
    console.log('vuex refresh login',session.access_token)
    const token = session.access_token;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    store.state.token = token
    console.log(decodedToken.exp,currentTime)
    if (decodedToken.exp < currentTime) {
      router.push('login')
      console.log("Token has expired");
    } else {
      console.log("Token is still valid");
    }
  }
};
