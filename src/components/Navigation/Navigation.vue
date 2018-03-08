<template lang="html">
  <div class="navigation">
    <Teams :teams="teams" :active="active" :route="true"></Teams>
  </div>
</template>

<script>
import Teams from '../Teams/Teams.vue'
import { db } from '../../firebase'

export default {
  name: 'Navigation',
  data () {
    return {
      teams: [],
      active: 1
    }
  },
  components: {
    Teams
  },
  firestore() {
    return {
      teams: db.collection('teams')
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
