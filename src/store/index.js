//引入vue和vuex的来源都是小写，使用的对象Vue Vuex都是大写
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'


Vue.use(Vuex)

//这里新建的时Vuex.Store,不是Vue.store
export default  new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})