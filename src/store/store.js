import { createStore } from 'vuex'
import { mutations } from './concepts/mutations'
import { actions } from './concepts/actions'
import { state } from './concepts/state'
import { getters } from './concepts/getters'

export default createStore({
    state,
    actions,
    mutations,
  })

// // store/index.js
// import { createStore } from 'vuex'
// // import { supabase } from '../supabase/supabase' // Import supabase client

// const store = createStore({
//     state: {
//         user: null,
//         token: null
//     },
//     mutations: {
//         setUser(state, user) {
//             state.user = user
//         },
//         setToken(state, token) {
//             state.token = token
//         }
//     },
//     actions: {
//         // async login({ commit }, { email, password }) {
//         //     console.log('email',email),
//         //     console.log('pass',password)
//         //     try {
//         //         const { user, error } = await supabase.auth.signInWithPassword({ email, password })
                
//         //         if (error) {
//         //             throw error
//         //         } else {
//         //             commit('setUser', user)
//         //             commit('setToken', user.session.access_token)
//         //         }
//         //     } catch (error) {
//         //         console.error('Login error:', error.message)
//         //         // Handle login error (e.g., display error message)
//         //     }
//         // }
//     }
// })
// export default action