<template lang="html">
  <div class="dashboard">
    <!-- <team></team> -->
    <container></container>
  </div>
</template>

<script>
import Container from './Container'
// import Team from '../Team/Team'
import { bus } from '../../main'

export default {
  name: 'Dashboard',
  components: {
    Container,
    // Team
  },
  created() {
    this.loadProfile()
  },
  methods: {
    loadProfile: function() {
      bus.$emit('test', 'data')
    }
  }
}
</script>

<style lang="scss">
  .dashboard {
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: #fff;
  }
</style>
