<template lang="html">
  <div class="add-playbook">
    Add checklist
    <input v-model="newChecklist" @change="addChecklist">
  </div>
</template>

<script>
import { db } from '../../firebase'
import firebase from 'firebase'

export default {
  name: 'AddChecklist',
  data () {
    return {
      newChecklist: '',
      createdBy: {},
      teams:[],
      user: ''
    }
  },
  firestore() {
    return {
      checklists: db.collection('checklists')
    }
  },
  methods: {
    addChecklist () {
      this.$firestore.checklists.add(
        {
          name: this.newChecklist,
          createdBy: {
            name: this.user.displayName,
            uid: this.user.uid
          },
          users:[
            this.user.uid
          ],
          timestamp: new Date()
        }
      );
      this.newChecklist = '';
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
