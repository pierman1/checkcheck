<template lang="html">
  <div class="playbooks-page">
    <div class="flex-container">
      <div class="col">
        <div class="inner">
          <div class="inner-header">
            <h2 class="title">Playbooks</h2>
            <div class="filter-text"  v-if="allPlaybooks.length > 0">
              filters:
            </div>
            <div class="filters-cta" @click="showFilters" v-if="allPlaybooks.length > 0">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <button type="button" @click="$modal.show('add-playbook')">New playbook</button>
          </div>
          <div class="inner-header" v-if="filtersVisible">
            <h2 class="title">Filters</h2>
            <button type="button" class="filter" @click="showAll($event)">Show all</button>
            <button type="button" class="filter" @click="showAssignedToMe($event)">Show assigned to me</button>
            <button type="button" class="filter" @click="showCreatedByMe($event)">Created by me</button>
            <button type="button" class="filter" @click="showCreatedByMe($event)">Active</button>
          </div>
          <div class="playbooks-container" v-if="filterOn">
            <Card v-for="playbook in playbooksAssignedToUser" :data="playbook"></Card>
          </div>
          <div class="playbooks-container" v-if="allPlaybooks && !filterOn">
            <Card v-for="playbook in allPlaybooks" :data="playbook"></Card>
          </div>
          <div class="playbooks-container white" v-if="allPlaybooks.length === 0">
            <svg width="68" height="81" xmlns="http://www.w3.org/2000/svg"><path d="M49.6 31.488h17.777L36.266.377 5.155 31.488h18.222c0 22.222-7.111 37.778-22.667 48.889 22.222-4.445 44.445-17.778 48.89-48.889z" fill="#655EFE" fill-rule="nonzero"/></svg>
            <div class="text-container">
              Start by creating your first playbook!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {db} from '../../firebase'

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
  data () {
    return {
      playbooksAssignedToUser: [],
      filtersVisible: false,
      filterOn: false
    }
  },
  firestore () {
    return {
      allPlaybooks: db.collection('playbooks')
    }
  },
  methods: {
    init () {
      this.get()
    },
    get () {
      this.$store.dispatch('playbooks/get')
    },
    getPlaybooksAssignedToUser() {
      const userId = this.$store.state.users.currentUser.userId
      this.playbooksAssignedToUser = []
      db.collection('playbooks').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          const users = doc.data().users

          if (users) {
            users.filter(user => {
              if (user['.key'] === userId) {
                this.playbooksAssignedToUser.push(doc.data())
              }
            })
          }
        })
      })
    },
    showFilters () {
      if (this.filtersVisible) {
        this.filtersVisible = false
      } else {
        this.filtersVisible = true
      }
    },
    showAssignedToMe (event) {
      var all = document.querySelectorAll('.filter')
      var i = 0
      all.forEach(el => {
        el.classList.remove('active')
      })
      event.target.classList.toggle('active')
      this.getPlaybooksAssignedToUser()
      this.filterOn = true
    },
    showAll (event) {
      var all = document.querySelectorAll('.filter')
      var i = 0
      all.forEach(el => {
        el.classList.remove('active')
      })
      event.target.classList.toggle('active')
      this.filterOn = false
    }
  },
  computed: {
    ...mapState({
      playbooks: state => state.playbooks.all
    })
  },
  created () {
    this.init()
    this.$store.state.db.collection('playbooks').doc('I5INMeT7HBCeGJegkWjJ').onSnapshot(playbook => {
      let source = playbook.metadata.hasPendingWrites ? 'Local' : 'Server'
      console.log(`Source ${source}`)
    })
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
      }
    }
  }

  button {
    @extend .btn-purple
  }

  .filter {
    @extend .btn-purple-border;
    width: auto;
    margin-left: 10px;
  }

  .playbooks-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

.filter-text {
  position: absolute;
  right: 190px;
  top: 19px;
  font-weight: 100;
  color: $purple;
}
</style>
