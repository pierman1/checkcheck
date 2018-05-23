const state = {
  all: {},
  currentChecklist: ''
}
const mutations = {
  SET_CHECKLIST (state, { checklist }) {
    state.all = { ...state.all, [checklist.id]: checklist.data() }
  }
}
const actions = {
  seed ({ rootState }) {
    let checklistRef = rootState.db.collection('checklists')
  },
  async get ({ commit, rootState }) {
    let checklistRef = rootState.db.collection('checklists')
    let checklists = await checklistRef.get()

    checklists.forEach(checklist => commit('SET_CHECKLIST', { checklist }))
  },
  addChecklist ({ commit, rootState }, { name, createdBy, tag, uid }) {
    const checklistRef = rootState.db.collection('checklists')
    checklistRef
      .add({
        name: name,
        createdBy: createdBy,
        tag: tag,
        uid: uid,
        timestamp: new Date()
      })
      .then(res => console.log('Checklist added'))
      .catch(err => console.log('Error => ', err))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
