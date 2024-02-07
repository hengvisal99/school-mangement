export const getters = {

  getUser(state) {
    return state.user;
  },
  getToken(state) {
    return state.user;
  },
  getLoginError(state){
    return state.loginError
  },
  getLoading: state => state.isLoading,
  getCount: state => state.count,
};
