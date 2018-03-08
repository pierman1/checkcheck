<template lang="html">
  <div class="dashboard">
    <!-- <team></team> -->
    <h2 class="title">Dashboard</h2>
    <p>Still under construction...</p>
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
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 40px;

    .title {
      font-weight: 700;
      margin: 0 0 30px 0;
    }
  }
</style>
