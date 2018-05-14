<template lang="html">
  <div class="activity-container">
    <div class="inner">
      <h3 class="title">Recent activity</h3>
      <transition-group name="card">
        <div class="activity-cell" v-for="(item, index) in activity" :key="index">
          <div class="activity-cell-header" :class="{'hideIt': index===activity.length-1}">
            <img :src="item.photoUrl" alt="">
            <div class="name">
              {{item.name}}
            </div>
          </div>
          <div class="activity-cell-body">
            <div class="name">
              <span v-if="item.name">{{item.createdBy.name}}</span> created <span>{{item.name}}</span>
            </div>
            <div class="time">Time: <span>Today</span> at <span>{{ JSON.stringify(item.timestamp).substring(12,22)}}</span></div>
          </div>
        </div>
      </transition-group>

      <div class="inside" v-if="activity.length === 0">
        No recent to show activity <router-link class="link" :to="{ name: '/playbooks', params: {} }">start by creating your first playbook</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Flickity from 'vue-flickity';
export default {
  props: ['activity'],
  name: 'RecentActivity',
  components: {
    Flickity
  },
  data() {
    return {
      flickityOptions: {
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        initialIndex: 1,
        cellAlign: 'center',
        autoPlay: true
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global.scss';
  .activity-container {
    width: calc(40% - 10px) !important;
    font-size: 12px;

    .inner {
      padding: 20px 0 20px 20px;
    }

    .title {
      font-size: 18px;
      font-weight: 700;
      margin: 0;
      margin-bottom: 10px;
    }

    .inside {
      margin-top: 10px;
    }

    a {
      color: #000;
      text-decoration: none;
      font-weight: 700;
      color: $purple;
    }

    span {
      color: #59cbff;
      font-weight: 700;
    }

    &:last-of-type {
      margin-right: 0;
      width: 40%;
    }
  }

  .flickity-viewport {
    height: 80px !important;
  }

  .link {
    padding: 0;
    display: inline;
  }

  .activity-cell {
    width: calc(100% - 3px);
    border-left: 3px solid $purple;
    padding: 4px;
    padding-left: 10px;
    background-color: #f9f9f9;

    &:nth-child(3) {
      background: #fff;
    }

    .activity-cell-header {
      display: flex;
      position: relative;
      width: 100%;

      .name {
        text-transform: capitalize;
        position: absolute;
        width: 100%;
        top: 50%;
        left: 30px;
        transform: translateY(-50%);
      }
    }
    .activity-cell-body {
      .name {
        margin-top: 4px;
      }
    }
    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid $purple;
      margin-right: 10px;
    }
  }
</style>
