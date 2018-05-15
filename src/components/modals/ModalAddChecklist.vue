<template lang="html">
  <modal name="ModalAddChecklist" class="modal">
    <div class="modal-container">
      <div class="close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.9 21.9">
          <path d="M14.1 11.3c-.2-.2-.2-.5 0-.7l7.5-7.5c.2-.2.3-.5.3-.7s-.1-.5-.3-.7L20.2.3c-.2-.2-.5-.3-.7-.3-.3 0-.5.1-.7.3l-7.5 7.5c-.2.2-.5.2-.7 0L3.1.3C2.9.1 2.6 0 2.4 0s-.5.1-.7.3L.3 1.7c-.2.2-.3.5-.3.7s.1.5.3.7l7.5 7.5c.2.2.2.5 0 .7L.3 18.8c-.2.2-.3.5-.3.7s.1.5.3.7l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3l7.5-7.5c.2-.2.5-.2.7 0l7.5 7.5c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.2-.2.3-.5.3-.7s-.1-.5-.3-.7l-7.5-7.5z"/>
        </svg>
      </div>
      <h2 class="title">Add checklist</h2>

    </div>
    <div class="modal-container">
      <input v-model="newChecklist" @change="addChecklist">
      <button class="btn btn-purple btn-bottom" @click="openModal()" name="button">Add Checklist</button>
    </div>
  </modal>
</template>

<script>
import { db } from '../../firebase'
import firebase from 'firebase'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ModalAddChecklist',
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
        timestamp: time,
        createdBy: {
          name: this.getUser.displayName,
          uid: this.getUser.uid
        }
      })

      this.newChecklist = '';
    },
    openModal () {
      console.log('open-modal');
      // this.$modal('ModalAddChecklist')
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
