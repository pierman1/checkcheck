const state = {
  all: {},
  currentUser: {
    name: 'joe'
  }
}
const mutations = {
  SET_USER (state, { user }) {
    state.all = { ...state.all, [user.id]: user.data() }
  },
  SET_CURRENT_USER (state, { user }) {
    state.currentUser = user
  }
}
const actions = {
  async get ({ commit, rootState }) {
    let userRef = rootState.db.collection('users')
    let users = await userRef.get()

    users.forEach(user => commit(SET_USER, { user }))
  },
  addUser ({ commit, rootState }, { displayName, email, photoURL, userId }) {
    let userRef = rootState.db.collection('users')
    userRef
      .doc(userId)
      .update({
        displayName: displayName,
        email: email,
        photoURL: photoURL,
        userId: userId
      })
      .then(() => {
        state.currentUser = {
          displayName: displayName,
          email: email,
          photoURL: photoURL,
          userId: userId
        }
      })
      .catch(error => {
        userRef
          .doc(userId)
          .set({
            displayName: displayName,
            email: email,
            photoURL: photoURL,
            userId: userId,
            timestamp: new Date()
          })
          .then(res => console.log('User added'))
          .catch(err => console.log('Error => ', err))
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
