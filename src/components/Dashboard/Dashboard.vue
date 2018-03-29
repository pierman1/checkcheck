<template lang="html">
  <div class="dashboard">
    <div class="flex-container">
      <div class="col">
        <h2 class="title">Dashboard</h2>
        <p>Still under construction...</p>
      </div>
      <div class="col">
        <RecentActivity></RecentActivity>
      </div>
    </div>
  </div>
</template>

<script>
// import Header from './Header'
import RecentActivity from './RecentActivity'
// import Teams from '../Team/Teams'
import { bus } from '../../main'

export default {
  name: 'Dashboard',
  components: {
    // Header,
    RecentActivity
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

    .title {
      font-weight: 700;
      margin: 0 0 30px 0;
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
  }
</style>
