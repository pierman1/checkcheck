<template lang="html">
  <modal name="add-checklist">
    <div class="container">
      <h4 class="title">New checklist</h4>
      <input v-model="newChecklist" @change="addChecklist">
    </div>
  </modal>
</template>

<script>
import { db } from '../../firebase'
import firebase from 'firebase'
import { mapGetters, mapMutations } from 'vuex'

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
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  firestore() {
    return {
      checklists: db.collection('checklists'),
      activity: db.collection('activity')
    }
  },
  methods: {
    addChecklist () {
      var time = new Date()

      this.$firestore.checklists.add(
        {
          name: this.newChecklist,
          createdBy: {
            name: this.getUser.displayName,
            uid: this.getUser.uid
          },
          users:[
            this.getUser.uid
          ],
          timestamp: time
        }
      );

      var activityName = 'Created new Checklist: ' + this.newChecklist

      this.$firestore.activity.add({
        name: activityName,
        photoUrl: this.getUser.photoURL,
        timestamp: time
      })

      this.newChecklist = '';
    }
  },
  created () {
    this.user = firebase.auth().currentUser
  }
}
</script>

<style scoped lang="scss">
  .add-checklist {
    background-color: #fff;
    padding: 20px;

    .title {
      font-size: 18px;
      font-weight: 800;
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
