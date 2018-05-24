<template lang="html">
  <div class="add-playbook">
    <h3>Add playbook</h3>
    <input v-model="newPlaybook">
    <button type="button" @click="addPlaybook">Add playbook</button>
  </div>
</template>

<script>
import { db } from '../../firebase'
import firebase from 'firebase'
import { mapGetters, mapMutations } from 'vuex'


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
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  firestore() {
    return {
      playbooks: db.collection('playbooks'),
      user: db.collection('users').where('uid', '==', 'vH9eFuuAA0d0z7l6r9RjU1obenS2')
    }
  },
  methods: {
    addPlaybook () {

      this.$firestore.playbooks.add(
        {
          name: this.newPlaybook,
          createdBy: {
            name: this.user.displayName,
            uid: this.user.uid,
            photoUrl: this.getUser.photoURL
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
    h3 {
      margin: 0;
      margin-bottom: 10px;
    }

    button {
      font-size: 13px;
      padding: 4px 10px;
      border-radius: 2px;
      color: #fff;
      background-color: #4DA1FF;
      text-align: center;
      margin-top: 10px;
    }

    input {
      background: #FFFFFF;
      border: 1px solid rgba(151,151,151,0.14);
      border-radius: 5px;
      width: 100%;
      font-size: 13px;
      padding: 4px 10px;

      &:focus {
        border: 1px solid #4DA1FF;
        outline: 0;
      }
    }
  }
</style>
