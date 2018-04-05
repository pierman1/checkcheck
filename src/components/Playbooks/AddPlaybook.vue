<template lang="html">
  <div class="add-playbook">
    Add playbook
    <input v-model="newPlaybook" @change="addPlaybook">
  </div>
</template>

<script>
import { db } from '../../firebase'
import firebase from 'firebase'

export default {
  name: 'AddPlaybook',
  data () {
    return {
      newPlaybook: '',
      createdBy: {},
      teams:[],
      user: ''
    }
  },
  firestore() {
    return {
      playbooks: db.collection('playbooks')
    }
  },
  methods: {
    addPlaybook () {
      this.$firestore.playbooks.add(
        {
          name: this.newPlaybook,
          createdBy: {
            name: this.user.displayName,
            uid: this.user.uid
          },
          users: [
            this.user.uid
          ],
          timestamp: new Date()
        }
      );
      this.newPlaybook = '';
    }
  },
  created () {
    this.user = firebase.auth().currentUser
  }
}
</script>

<style scoped lang="scss">
  .add-playbook {

  }
</style>
