<template lang="html">
  <modal name="add-playbook" class="add-playbook">
    <div class="modal-container">
      <div class="close" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.9 21.9">
          <path d="M14.1 11.3c-.2-.2-.2-.5 0-.7l7.5-7.5c.2-.2.3-.5.3-.7s-.1-.5-.3-.7L20.2.3c-.2-.2-.5-.3-.7-.3-.3 0-.5.1-.7.3l-7.5 7.5c-.2.2-.5.2-.7 0L3.1.3C2.9.1 2.6 0 2.4 0s-.5.1-.7.3L.3 1.7c-.2.2-.3.5-.3.7s.1.5.3.7l7.5 7.5c.2.2.2.5 0 .7L.3 18.8c-.2.2-.3.5-.3.7s.1.5.3.7l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3l7.5-7.5c.2-.2.5-.2.7 0l7.5 7.5c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.2-.2.3-.5.3-.7s-.1-.5-.3-.7l-7.5-7.5z"/>
        </svg>
      </div>

        <h2 class="title">Add playbook</h2>
        <div class="select-user">
      </div>
    </div>
    <div class="modal-body">
      <div class="form-input-container half">
        <label for="name">Playbook name</label>
        <input v-model="newPlaybook" placeholder="New playbook name">
      </div>
      <div class="form-input-container half">
        <label for="name">Due date</label>
        <input v-model="newPlaybookDuedate" type="date">
      </div>
      <div class="error-message">
        {{errorMsg}}
      </div>
    </div>
    <button class="btn btn-purple btn-bottom" @click="addPlaybook" name="button">Add playbook</button>
  </modal>
</template>

<script>

import { db } from '../../firebase'

export default {
  name: 'addPlaybook',
  data () {
    return {
      newPlaybook: '',
      newPlaybookDuedate: '',
      errorMsg: ''
    }
  },
  firestore () {
    return {
      activity: db.collection('activity')
    }
  },
  methods: {
    addPlaybook () {
      if (this.newPlaybook.length > 0 && this.newPlaybookDuedate) {
        this.$store.dispatch('playbooks/addPlaybook', {
          name: this.newPlaybook,
          createdBy: this.$store.state.users.currentUser,
          duedate: this.newPlaybookDuedate
        })
        this.newPlaybook = ''
        this.newPlaybookDuedate = ''
        this.$modal.hide('add-playbook')

        var activityName = 'Created new Playbook: ' + this.newPlaybook

        this.$firestore.activity.add({
          name: activityName,
          photoURL: this.$store.state.users.currentUser.photoURL,
          timestamp: new Date(),
          createdBy: {
            name: this.$store.state.users.currentUser.displayName,
            uid: this.$store.state.users.currentUser.userId
          }
        })

        this.$notify({
          group: 'foo',
          title: this.$store.state.users.currentUser.displayName,
          text: activityName
        });

      } else {
        this.errorMsg = 'Please fill all fields'
      }
    },
    closeModal () {
      this.$modal.hide('add-checklist')
    }
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

  .modal-container {
    padding: 20px;
    color: lighten($purple, 100%);

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
