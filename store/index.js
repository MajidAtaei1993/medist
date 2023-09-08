import Vuex from 'Vuex'

import * as actions from './actions'
import * as mutations from './mutations'


const store = () => {
    return new Vuex.Store({
        state: {},
        getters: {},
        actions,
        mutations
    })
}