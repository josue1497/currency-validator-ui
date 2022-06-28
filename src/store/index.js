import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const defaultState = {
  selectedA: {},
  selectedB: {},
  listA: {},
  listB: {},
  priceA: 0,
  priceB: 0,
}

const store = new Vuex.Store({
  state: defaultState,
  mutations: {
    selectedB: (state, value) => {
      state.selectedB = { ...value }
    },
    selectedA: (state, value) => {
      state.selectedA = { ...value }
    },
    listA: (state, value) => {
      state.listA = [...value]
    },
    listB: (state, value) => {
      state.listB = [...value]
    },
    priceA: (state, value) => {
      state.priceA = value
    },
    priceB: (state, value) => {
      state.priceB = value
    },
  },
  actions: {
    setSelectedA: ({ commit }, value) => commit("selectedA", value),
    setSelectedB: ({ commit }, value) => commit("selectedB", value),
    setListA: ({ commit }, value) => commit("listA", value),
    setListB: ({ commit }, value) => commit("listB", value),
    setPriceA: ({ commit }, value) => commit("priceA", value),
    setPriceB: ({ commit }, value) => commit("priceB", value),
    setCalcs: ({ state }) => {
      console.log(state)
    },
  },
})

export default store
