import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: [],
    statusFilter: '',
    nameFilter: '',
    loading: false,
    error: null
  },
  getters: {
    filteredCharacters (state) {
      const status = state.statusFilter
      const name = state.nameFilter.trim().toLowerCase()

      return state.characters.filter(character => {
        const matchesStatus = status ? character.status === status : true
        const matchesName = name ? character.name.toLowerCase().includes(name) : true
        return matchesStatus && matchesName
      })
    }
  },
  mutations: {
    setCharacters (state, payload) {
      state.characters = payload
    },
    setStatusFilter (state, payload) {
      state.statusFilter = payload
    },
    setNameFilter (state, payload) {
      state.nameFilter = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    }
  },
  actions: {
    async getCharacters ({ commit }) {
      commit('setLoading', true)
      commit('setError', null)
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character/')
        const data = await response.json()

        commit('setCharacters', data.results)
      } catch (error) {
        commit('setError', error?.message || String(error))
      } finally {
        commit('setLoading', false)
      }
    },
    filterByStatus ({ commit }, status) {
      commit('setStatusFilter', status)
    },
    filterByName ({ commit }, name) {
      commit('setNameFilter', name)
    }
  },
  modules: {
  }
})
