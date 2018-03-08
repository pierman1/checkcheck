<template lang="html">
  <div class="dashboard">
    <!-- <team></team> -->
    <Header></Header>
  </div>
</template>

<script>
import Header from './Header'
// import Teams from '../Team/Teams'
import { bus } from '../../main'

export default {
  name: 'Dashboard',
  components: {
    Header
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

<style scoped lang="scss">
  .dashboard {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>
