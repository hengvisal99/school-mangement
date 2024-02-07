
export const mutations = {
    increment(state) {
        state.count++;
      },
      decrement(state) {
        state.count--;
      },
    setUser(state, user) {
        console.log('set user',user)
        state.user = user
    },
    setToken(state, token) {
        console.log('set token',token)
        state.token = token
    },
    setLoginError(state,error){
        state.loginError = error
    },
    setLoading(state,loading) {
        console.log('loading',loading)
        state.isLoading = loading;
    },
};
