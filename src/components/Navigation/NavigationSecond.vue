<template lang="html">
  <!-- <div class="navigation-second" :class="{ 'sidebarOpen' : $store.state.sidebarStatus }"> -->
  <div class="navigation-second">
    <div class="left">
      <router-link class="link" :to="{ name: 'Dashboard', params: {} }">
        <span>Dashboard</span>
      </router-link>
      <router-link class="link" :to="{ name: 'playbooks', params: {} }">
        <span>Playbooks</span>
      </router-link>
      <router-link class="link" :to="{ name: 'checklists', params: {} }">
        <span>Checklists</span>
      </router-link>
    </div>
    <div class="right">
      <!-- <button class="btn" name="button" @click="openActivity">Active users</button> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'NavigationSecond',
  computed: {
    // ...mapGetters([
    //   'getSidebarStatus'
    // ])
  },
  methods: {
    // openActivity() {
    //   if (!this.getSidebarStatus) {
    //     this.$store.state.sidebarStatus = true
    //   } else {
    //     this.$store.state.sidebarStatus = false
    //   }
    // }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global.scss';
  .navigation-second {
    width: calc(100% - 80px);
    flex-direction: row;
    background-color: #fff;
    // border-bottom: 1px solid #F0F0F0;
    padding-left: 20px;
    height: 40px;
    display: flex;
    position: fixed;
    right: 0;
    z-index: 998;
    transition: 2s;

    &.sidebarOpen {
      box-shadow: 0px 2px 5px 0px rgba(0,0,0,.18);
    }

    .left {
      width: 50%;
      display: flex;
      flex-direction: row;
    }

    .right {
      width: 50%;
    }

    button {
      margin-right: 40px;
      margin-top: 10px;
      @extend .btn-header
    }

    .link {
      font-size: 0.65em;
      font-weight: 500;
      letter-spacing: 1px;
      text-decoration: none;
      text-transform: uppercase;
      color: #000;
      opacity: 0.3;
      transition: 250ms opacity;
      height: 100%;
      display: block;
      position: relative;
      width: 120px;
      width: 120px;
      transition: .2s;
      border-bottom: 3px solid transparent;

      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        transition: .2s;
      }



      &:hover,
      &.router-link-active {
        opacity: 1;
        border-bottom: 3px solid $purple;
      }
    }
  }
</style>
