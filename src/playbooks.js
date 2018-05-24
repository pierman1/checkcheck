const state = {
  all: {},
  currentPlaybook: ''
}
const mutations = {
  SET_PLAYBOOK (state, { playbook }) {
    state.all = { ...state.all, [playbook.id]: playbook.data() }
  }
}
const actions = {
  seed ({ rootState }) {
    let playbookRef = rootState.db.collection('playbooks')
  },
  async get ({ commit, rootState }) {
    let playbookRef = rootState.db.collection('playbooks')
    let playbooks = await playbookRef.get()

    playbooks.forEach(playbook => commit('SET_PLAYBOOK', { playbook }))
  },
  addPlaybook ({ commit, rootState }, { name, createdBy, duedate }) {
    const playbookRef = rootState.db.collection('playbooks')
    playbookRef
      .add({
        name: name,
        createdBy: createdBy,
        timestamp: new Date(),
        duedate: duedate
      })
      .then(res => console.log('Playbook added'))
      .catch(err => console.log('Error => ', err))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
