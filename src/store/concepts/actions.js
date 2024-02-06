
export const actions = {
    asyncIncrement({ commit }) {
        setTimeout(() => {
          commit('increment');
        }, 1000);
      },
      asyncDecrement({ commit }) {
        setTimeout(() => {
          commit('decrement');
        }, 1000);
      }
  };
  