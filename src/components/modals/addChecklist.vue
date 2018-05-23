<template lang="html">
  <modal name="add-checklist" class="add-playbook">
    <div class="modal-container">
      <div class="close" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.9 21.9">
          <path d="M14.1 11.3c-.2-.2-.2-.5 0-.7l7.5-7.5c.2-.2.3-.5.3-.7s-.1-.5-.3-.7L20.2.3c-.2-.2-.5-.3-.7-.3-.3 0-.5.1-.7.3l-7.5 7.5c-.2.2-.5.2-.7 0L3.1.3C2.9.1 2.6 0 2.4 0s-.5.1-.7.3L.3 1.7c-.2.2-.3.5-.3.7s.1.5.3.7l7.5 7.5c.2.2.2.5 0 .7L.3 18.8c-.2.2-.3.5-.3.7s.1.5.3.7l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3l7.5-7.5c.2-.2.5-.2.7 0l7.5 7.5c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.2-.2.3-.5.3-.7s-.1-.5-.3-.7l-7.5-7.5z"/>
        </svg>
      </div>
      <h2 class="title">Add checklist</h2>

    </div>
    <div class="modal-container dark">
      <div class="tags">
        <div class="tag" v-for="tag in tags" @click="setActiveTag(tag, $event)">
          {{tag.name}}
        </div>
      </div>
    </div>
    <div class="modal-container">
      <button class="btn btn-purple btn-bottom" @click="addChecklist" name="button">Add Checklist</button>
      <div class="form-input-container half">
        <label for="name">Checklist name</label>
        <input v-model="newChecklist">
      </div>
      <div class="error-message">
        {{errorMsg}}
      </div>
    </div>
  </modal>

</template>

<script>
import { db } from '../../firebase'
import firebase from 'firebase'
import { mapState } from 'vuex'
import { uuid } from 'vue-uuid'

export default {
  name: 'ModalAddChecklist',
  data () {
    return {
      newChecklist: '',
      createdBy: {},
      teams:[],
      user: '',
      activeTag: '',
      errorMsg: ''
    }
  },
  firestore() {
    return {
      checklists: db.collection('checklists'),
      tags: db.collection('tags'),
      activity: db.collection('activity')
    }
  },
  methods: {
    addChecklist () {
      var time = new Date()

      // this.$firestore.checklists.add(
      //   {
      //     name: this.newChecklist,
      //     createdBy: {
      //       name: this.getUser.displayName,
      //       uid: this.getUser.uid
      //     },
      //     users:[
      //       this.getUser.uid
      //     ],
      //     timestamp: time
      //   }
      // );
      if (this.activeTag) {
        this.$store.dispatch('checklists/addChecklist', {
          name: this.newChecklist,
          createdBy: this.$store.state.users.currentUser,
          uid: this.$uuid.v1(),
          tag: this.activeTag
        })
      } else {
        this.errorMsg = 'Please fill all the required fields'
      }

      this.$modal.hide('add-playbook')

      var activityName = 'Created new Checklist: ' + this.newChecklist

      // this.$firestore.activity.add({
      //   name: activityName,
      //   photoURL: this.getUser.photoURL,
      //   timestamp: time,
      //   createdBy: {
      //     name: this.getUser.displayName,
      //     uid: this.getUser.uid
      //   }
      // })

      this.newChecklist = '';
    },
    setActiveTag (tag, event) {
      var all = document.querySelectorAll('.tag')
      all.forEach(item => {
        item.classList.remove('active')
      })
      event.target.classList.add('active')
      this.activeTag = tag
    },
    closeModal () {
      this.$modal.hide('add-checklist')
    }
  },
  created () {
    this.user = firebase.auth().currentUser
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global.scss';
.add-playbook {

  h2 {
    font-size: 14px;
    font-weight: 700;
    margin: 0;
    width: 100%;
    text-align: center;
  }

  p {
    font-size: 12px;
    color: #fff;
  }

  .select-user {
    display: flex;
    flex-direction: row;
    margin-top: 40px;
    select, p {
      width: 50%;
      font-size: 14px;
    }
  }

  .administrator-check {
    width: 25%;
    display: flex;
    justify-content: space-between;
  }

  .tags {
    display: flex;
    flex-direction: row;

    .tag {
      background-color: $purple;
      color: #fff;
      border-radius: 20px;
      padding: 4px 10px;
      font-size: 12px;
      margin-right: 8px;
      cursor: pointer;

      &.active {
        background-color: darken($purple, 10%);
      }
    }
  }

  .modal-container {
    padding: 20px;
    color: lighten($purple, 100%);

    &.dark {
      background-color: #d1d1d1;
    }

    &:first-of-type {
      background-color: $purple;
    }

    .close {
      position: absolute;
      right: 20px;
      top: 10px;
      svg {
        width: 10px;
      }
    }
  }
  .btn {
    position: absolute;

    &.btn-bottom {
      right: 20px;
      bottom: 20px;
    }
  }
}
</style>
