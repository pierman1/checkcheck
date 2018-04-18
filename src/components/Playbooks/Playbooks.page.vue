<template lang="html">
  <div class="playbooks-page">
    <div class="flex-container">
      <!-- {{safelyStoredNumber}} -->
      <div class="col">
        <h2 class="title">Playbooks page</h2>
        {{getUser}}
        <div class="playbooks-container">
          <Card v-for="playbook in playbooks" :data="playbook" :name="'playbook.name'"></Card>
        </div>
      </div>
      <div class="col">
        <AddPlaybook></AddPlaybook>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../../firebase'
import { mapGetters, mapMutations } from 'vuex'
import Card from '../Card/Card.vue'
import AddPlaybook from './AddPlaybook'

export default {
  name: 'PlaybooksPage',
  components: {
    Card,
    AddPlaybook
  },
  data() {
    return {
      name: 'playbook',
      playbooks: '',
      // user: ''
    }
  },
  computed: {
    ...mapGetters([
      // Mounts the "safelyStoredNumber" getter to the scope of your component.
      'getUser'
    ])
  },
  firestore () {
    return {
      playbooks: db.collection('playbooks').where("createdBy.uid", '==', 'vH9eFuuAA0d0z7l6r9RjU1obenS2')
    }
  },
  created() {
  //   function getPlaybooks() {
  //     var returnArr = []
  //     db.collection('playbooks').where("createdBy.uid", '==', 'vH9eFuuAA0d0z7l6r9RjU1obenS2')
  //       .get()
  //       .then(function(querySnapshot) {
  //         console.log(querySnapshot);
  //
  //         querySnapshot.forEach(function(doc) {
  //
  //           returnArr.push(doc.data())
  //
  //         })
  //         return returnArr;
  //       })
  //       .catch(function(error) {
  //         console.log(error);
  //       })
  //
  //       return returnArr
  //   }
  //   this.playbooks = getPlaybooks()
  // }
  }
}
</script>

<style lang="scss">
  .playbooks-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #fff;

    .title {
      font-weight: 700;
      margin: 0;
      margin-bottom: 20px;
    }

    .flex-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 100%;

      .col {
        width: 70%;
        padding: 40px;
        height: 100%;

        &:nth-child(2) {
          width: 30%;
          border-left: 1px solid #F0F0F0;
        }
      }
    }

    .playbooks-container {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-gap: 10px;
    }
  }
</style>
