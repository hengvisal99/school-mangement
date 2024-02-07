import { createStore } from 'vuex'
import { mutations } from './concepts/mutations'
import { actions } from './concepts/actions'
import { state } from './concepts/state'
import { getters } from './concepts/getters'

export default createStore({
    state,
    actions,
    mutations,
    getters
  })
