<template lang="html">
  <modal name="add-playbook">
    <div class="container">
      <h3>Add playbook</h3>
      <input v-model="newPlaybook">
      <button type="button" @click="addPlaybook">Add playbook</button>
    </div>
  </modal>
</template>

<script>
import { db } from '../../firebase'
import firebase from 'firebase'
import { mapGetters, mapMutations } from 'vuex'


export default {
  name: 'addPlaybook',
  data () {
    return {
      newPlaybook: '',
      createdBy: {},
      teams:[]
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
      activity: db.collection('activity')
    }
  },
  methods: {
    addPlaybook () {

      var time = new Date()

      this.$firestore.playbooks.add(
        {
          name: this.newPlaybook,
          createdBy: {
            name: this.getUser.displayName,
            uid: this.getUser.uid
          },
          users: [
            this.getUser.uid
          ],
          timestamp: time
        }
      );



      var activityName = 'Created new Playbook: ' + this.newPlaybook

      this.$firestore.activity.add({
        name: activityName,
        photoUrl: this.getUser.photoURL,
        timestamp: time
      })
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
