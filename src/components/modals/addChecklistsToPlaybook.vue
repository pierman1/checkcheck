<template lang="html">
  <modal name="addChecklistsToPlaybook" class="add-playbook" @before-open="passPlaybook">
    <div class="modal-container">
      <div class="close" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.9 21.9">
          <path d="M14.1 11.3c-.2-.2-.2-.5 0-.7l7.5-7.5c.2-.2.3-.5.3-.7s-.1-.5-.3-.7L20.2.3c-.2-.2-.5-.3-.7-.3-.3 0-.5.1-.7.3l-7.5 7.5c-.2.2-.5.2-.7 0L3.1.3C2.9.1 2.6 0 2.4 0s-.5.1-.7.3L.3 1.7c-.2.2-.3.5-.3.7s.1.5.3.7l7.5 7.5c.2.2.2.5 0 .7L.3 18.8c-.2.2-.3.5-.3.7s.1.5.3.7l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3l7.5-7.5c.2-.2.5-.2.7 0l7.5 7.5c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.2-.2.3-.5.3-.7s-.1-.5-.3-.7l-7.5-7.5z"/>
        </svg>
      </div>
        <h2 class="title">Add checklists to playbook </h2>
    </div>
    <div class="modal-body">
      <div class="inner">
        <h2 class="title-secondary">Select checklists to add</h2>
        <div class="all-checklists-container">
          <div class="list" v-for="checklist in checklists" @click="addChecklistToArray(checklist, $event)">
            <h5 class="name">{{checklist.name}}</h5>
          </div>
        </div>
      </div>
      <button class="btn btn-purple btn-bottom" @click="addChecklistsToPlaybook" name="button">Add to playbook</button>
    </div>
  </modal>
</template>

<script>
import { db } from '../../firebase'
import firebase from 'firebase'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'addChecklistToPlaybook',
  data () {
    return {
      name: 'user',
      selectedLists: [],
      playbook: {}
    }
  },
  firestore() {
    return {
      checklists: db.collection('checklists'),
      activity: db.collection('activity')
    }
  },
  methods: {
    closeModal () {
      this.$modal.hide('addChecklistsToPlaybook')
    },
    addChecklistsToPlaybook () {
      db.collection('playbooks').doc(this.playbook['.key'])
        .update({
          'checklists': this.selectedLists
        })
        .then(res => {
          console.log('Checklist added to playbook')
          var activityName = 'Added checklist'

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
            title: 'Checkbot',
            text: activityName
          });

          this.closeModal()
        })
        .catch(err => console.log('Error => ', err))
    },
    addChecklistToArray (checklist, event) {
      this.selectedLists.push(checklist)
      event.path[1].classList.toggle('active')
    },
    passPlaybook (event) {
      this.playbook = event.params
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

.modal-body {
  height: 80%;
}

.all-checklists-container {
  display: flex;
  flex-direction: space-between;
  flex-wrap: wrap;
  margin-top: 10px;

  .list {
    width: 100%;
    background-color: lighten($light-purple, 10%);
    color: $purple;
    padding: 8px 8px;
    cursor: pointer;

    &.active {
      border: 1px solid $purple;
    }

    .name {
      font-size: 14px;
      font-weight: 100;
      margin: 0;
    }

    @include phone-landscape-up {
      width: 50%;

      // &:nth-child(even) {
      //   border-left: 0;
      // }
    }
  }
}
</style>
