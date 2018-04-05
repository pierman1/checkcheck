<template lang="html">
  <div class="navigation">
    <Teamswitcher></Teamswitcher>
    <Teams :teams="teams" :route="'team'" @showPlaybooks="showPlaybooks"></Teams>
    <PlaybooksList :playbooks="playbooks" :route="'playbook'"></PlaybooksList>
  </div>
</template>

<script>
import Teams from '../Teams/Teams.vue'
import PlaybooksList from '../Playbooks/PlaybooksList.vue'
import Teamswitcher from '../Teamswitcher/Teamswitcher.vue'
import { db } from '../../firebase'

export default {
  name: 'Navigation',
  data () {
    return {
      teams: [],
      playbooks: []
    }
  },
  components: {
    Teams,
    PlaybooksList,
    Teamswitcher
  },
  firestore() {
    return {
      teams: db.collection('teams'),
      playbooks: db.collection('playbooks')
    }
  },
  methods: {
    showPlaybooks () {
      console.log('homo3');
    }
  }
}
</script>

<style lang="scss">
  .navigation {
    position: relative;
    width: 340px;
    height: 100vh;
    border-right: 1px solid #F0F0F0;
    background-color: #fff;
  }
</style>
