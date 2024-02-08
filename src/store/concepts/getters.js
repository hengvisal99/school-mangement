export const getters = {

  getUser(state) {
    return state.user;
  },
  getToken(state) {
    console.log('get token',state)
    return state.token;
  },
  getLoginError(state){
    return state.loginError
  },
  getLoading: state => state.isLoading,
  getCount: state => state.count,
  isAuth : state => !!state.token,
  getRedirectedFrom : state => state.redirectedFrom,

};
