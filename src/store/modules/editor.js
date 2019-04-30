// initial state
const state = {
    title: "",
    body: "",
    markdownPreviewEnabled: false
}

// getters
const getters = {}

// actions
const actions = {
    toggleMarkdownPreview({ commit }) {
        commit('toggleMarkdownPreview')
    }
}

// mutations
const mutations = {
    toggleMarkdownPreview(state) {
        state.markdownPreviewEnabled = !state.markdownPreviewEnabled
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}