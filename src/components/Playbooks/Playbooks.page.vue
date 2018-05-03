<template lang="html">
  <div class="playbooks-page">
    <div class="playbooks-page-header">
      <h2 class="title">Playbooks</h2>
    </div>
    <div class="flex-container">
      <div class="col">
        <div class="playbooks-container">
          <Card v-for="playbook in playbooks" :data="playbook" :name="name"></Card>
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
import ChoosePlaybook from './ChoosePlaybook'

export default {
  name: 'PlaybooksPage',
  components: {
    Card,
    AddPlaybook,
    ChoosePlaybook
  },
  data() {
    return {
      name: 'playbook',
      playbooksList: ''
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  firestore () {
    var userId = this.getUser.uid
    var filtered = db.collection('playbooks')
    console.log(userId)
    console.log('filtered', filtered)
    return {
      playbooks: db.collection('playbooks')
    }
  },
  methods: {
    showPlaybook(key) {
      console.log(this.$firestore.playbooks.doc(key))

      this.playbooktoShow = this.$firestore.playbooks.doc(key)
    }
  },
  created () {

    var user = this.getUser
    console.log(user.playbooks)

    // this.playbooksList = this.playbooks
    // console.log(user, playbooks, this.playbooksList.length)
    // var filteredPlaybooks = []


    //
    // playbooks.forEach(function (playbook) {
    //   console.log(playbook)
    // })
    // = playbooks.filter(function(playbook) {
    //   if (playbook['.key'] === 'tvhw7wCWHDZFSwJh1BLv') {
    //     return playbook
    //   }

    // console.log(filteredPlaybooks);
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

<style scoped lang="scss">
  .playbooks-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 20px;

    .playbooks-page-header {
      width: 100%;
    }

    .title {
      font-weight: 700;
      margin: 0;
      margin-bottom: 20px;
      font-size: 38px;
      font-weight: 500;
      color: #233539;
      letter-spacing: -1.09px;
      display: inline-block;
      margin-right: 10px;
    }

    .title-second {
      font-size: 11px;
      text-transform: uppercase;
      margin: 0;
      margin-bottom: 20px;
    }

    .flex-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 100%;

      .col {
        width: calc(20% - 10px);
        padding: 20px;
        height: 90%;
        margin-right: 20px;
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 0 2px 9px 0 rgba(0,0,0,0.03);
        overflow: scroll;

        &:nth-child(1) {
          width: calc(60% - 10px);
        }

        &:nth-child(2) {
          width: calc(20% - 10px);
          border-left: 1px solid #F0F0F0;
          margin-right: 0;
          height: 180px;
        }
      }
    }

    button {
      display: inline-block;
      background-color: #4DA1FF;
      max-width: 140px;
      padding: 4px 10px;
      color: #fff;
      border-radius: 2px;
      font-weight: 100;
      span {
        color: #fff;
      }
    }

    .playbooks-container {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
