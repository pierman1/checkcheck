<template lang="html">
  <!-- <div class="playbooks-page">
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
  </div> -->

  <div class="playbooks-page">
    <div class="flex-container">
      <div class="col">
        <div class="inner">
          <div class="inner-header">
            <h2 class="title">Playbooks</h2>
            <button type="button" @click="$modal.show('add-playbook')">New playbook</button>
          </div>
          <div class="playbooks-container" v-if="playbooks.length > 0">
            <Card v-for="playbook in playbooks" :data="playbook" :name="name"></Card>
          </div>
          <div class="playbooks-container white" v-else>
            <svg width="68" height="81" xmlns="http://www.w3.org/2000/svg"><path d="M49.6 31.488h17.777L36.266.377 5.155 31.488h18.222c0 22.222-7.111 37.778-22.667 48.889 22.222-4.445 44.445-17.778 48.89-48.889z" fill="#655EFE" fill-rule="nonzero"/></svg>
            <div class="text-container">
              Start by creating your fist playbook!
            </div>
          </div>
        </div>
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
@import '../../assets/global.scss';

.playbooks-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 40px;

  .title {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
  }

  .flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;

    .col {
      width: 100%;
      height: 100%;
      padding: 20px;

      .inner {
        width: 100%;

        .inner-header {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          width: 100%;
          padding: 15px 20px;
          border-bottom: 1px solid #F0F0F0;
          margin-bottom: 10px;
          position: relative;
          background: #fff;
        }
      }

      &:nth-child(2) {
        width: 30%;
        padding-left: 0;
        // border-left: 1px solid #F0F0F0;
      }
    }
  }

  button {
    @extend .btn-purple
  }

  .playbooks-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;

    &.white {
      position: relative;

      .text-container {
        position: absolute;
        right: 140px;
        top: 70px;
        font-weight: 700;
        font-size: 28px;
        color: $purple;
      }

      svg {
        position: absolute;
        right: 40px;
        width: 80px;
        height: auto;
      }
    }
  }
}
</style>
