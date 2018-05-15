<template lang="html">
  <div class="sidebar">
    <transition name="fade">
      <div class="background" v-if="getSidebarStatus" @click="hideSidebar"></div>
    </transition>
    <transition name="slide-fade">
      <div class="content" v-if="getSidebarStatus">
        <!-- <div class="close">
          x
        </div> -->
        <ActiveUsers/>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ActiveUsers from '../Users/activeUsers.vue'

export default {
  name: 'Sidebar',
  components: {
    ActiveUsers
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters([
      'getSidebarStatus'
    ])
  },
  methods: {
    hideSidebar() {
      this.$store.state.sidebarStatus = false
    }
  }
}
</script>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(100%);
  }

  .title {
    font-size: 14px;
    padding: 10px;
  }

  .sidebar {
    .content {
      background-color: #fff;
      color: #000;
      width: 90%;
      max-width: 300px;
      min-height: calc(100vh - 64px);
      border-right: 2px solid #cecece;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      margin-top: 40px;
    }


    .background {
      cursor: pointer;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
    }
  }

  .title {

  }
</style>
