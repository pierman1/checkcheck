const state = {
  all: {},
  currentTask: ''
}
const mutations = {
  SET_TASK (state, { task }) {
    state.all = { ...state.all, [task.id]: task.data() }
  }
}
const actions = {
  seed ({ rootState }) {
    let taskRef = rootState.db.collection('tasks')
  },
  async get ({ commit, rootState }) {
    let taskRef = rootState.db.collection('tasks')
    let tasks = await taskRef.get()

    tasks.forEach(task => commit('SET_TASK', { task }))
  },
  addTask ({ commit, rootState }, { name, checklistId, createdBy }) {
    const taskRef = rootState.db.collection('tasks')
    taskRef
      .add({
        name: name,
        checklistId: checklistId,
        createdBy: createdBy,
        timestamp: new Date()
      })
      .then(res => console.log('Task added'))
      .catch(err => console.log('Error => ', err))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
