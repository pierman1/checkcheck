<template lang="html">
  <div class="navigation">
    <Teamswitcher></Teamswitcher>
    <NavigationList :data='teams' :name="'teams'"
    :visible="true"
    @linkClicked="linkClicked"></NavigationList>
    <NavigationList :data='playbooks' :name="'teams'"
    :visible="false"
    @linkClicked="linkClicked"></NavigationList>
  </div>

</template>

<script>
import Teamswitcher from '../Teamswitcher/Teamswitcher.vue'
import NavigationList from '../Navigation/NavigationList.vue'
import { db } from '../../firebase'
import firebase from 'firebase'

export default {
  name: 'Navigation',
  data () {
    return {
      teams: [],
      activeTeam: '',
      playbooks: [],
      user: {}
    }
  },
  components: {
    Teamswitcher,
    NavigationList
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
      console.log(this.activeTeam);

      this.playbooks = db.collection('playbooks').doc(this.activeTeam)
      console.log(this.playbooks);
    },
    linkClicked (item, name) {
      // console.log('linkClicked', item);
      // console.log(name);
      if (name === 'teams') {
        this.activeTeam = item['.key']
        this.showPlaybooks()
      }
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
