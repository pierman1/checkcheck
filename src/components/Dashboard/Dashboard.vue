<template lang="html">
  <div class="dashboard-page">
    <div class="flex-container">
      <div class="col">
        <div class="inner">
          <div class="inner-header">
            <h2 class="title-first">Dashboard</h2>
            <button type="button" @click="$modal.show('settings')">Open settings</button>
          </div>
          <div class="stats-container">
            <div class="stat-container">
              <router-link to="/playbooks">
                📚 Active playbooks |
                <span>{{playbooks.length}}</span>
              </router-link>
            </div>
            <div class="stat-container">
              <router-link to="/checklists">
                📑 Total checklists |
                <span>{{checklists.length}}</span>
              </router-link>
            </div>
            <div class="stat-container">
              <!-- <router-link to="/"> -->
              <a href="#">
                💁 Active users |
                <span>{{activeUsers.length}}</span>
              </a>
              <!-- </router-link> -->
            </div>
            <div class="stat-container">
              <div class="search">
                <input type="text" name="" value="" class="input-search" placeholder="Search">
              </div>
            </div>
          </div>
          <div class="stats-container">
            <RecentActivity :activity="latestActivities"/>
            <YourActivity/>
          </div>
          <div class="dashboard-container">
            <h2 class="title">Activity</h2>
            <chart :data="chartData" :width="400" :height="100"></chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../../firebase'
import { mapGetters, mapMutations } from 'vuex'
import { bus } from '../../main'
import RecentActivity from './RecentActivity'
import YourActivity from './YourActivity'
import chart from './chart.js'

export default {
  name: 'Dashboard',
  components: {
    RecentActivity,
    YourActivity,
    chart
  },
  data () {
    return {
      chartData: {
        labels: ['May \'17', 'June \'17', 'July \'17', 'August \'17', 'September \'17', 'October \'17', 'November \'17', 'December \'17', 'January \'18', 'February \'18', 'March \'18', 'April \'18'],
        datasets: [
          {
            label: 'Recent Activity',
            data: [40, 39, 10, 40, 39, 80, 40, 20, 25, 68, 55, 80],
            borderColor: '#655EFE',
            backgroundColor: 'rgba(10, 156, 230, 0.1)'
          }, {
            label: 'Personal Activity',
            data: [60, 55, 32, 10, 2, 12, 53, 10, 40, 39, 70, 32],
            borderColor: '#655EFE',
            backgroundColor: 'rgb(255,137,241, 0.3)'
          }
        ],
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ]),
    latestActivities () {
      return this.acitivites.slice(0, 3)
    }
  },
  firestore () {
    return {
      // playbooks: db.collection('playbooks').where("createdBy.uid", '==', this.getUser.uid),
      acitivites: db.collection('activity').orderBy('timestamp', 'desc').limit(4),
      allActivities: db.collection('activity').orderBy('timestamp', 'desc'),
      activeUsers: db.collection('users'),
      playbooks: db.collection('playbooks'),
      checklists: db.collection('checklists')
    }
  },
  created() {
    this.loadProfile()
    const now = new Date();
    const lastMidnight = now.setHours(0,0,0,0);

    console.log(now, lastMidnight)
  },
  methods: {
    loadProfile: function() {
      bus.$emit('test', 'data')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global.scss';
.dashboard-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 40px;

  .title {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
  }

  .title-first {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
  }

  .flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;

    .col {
      width: 100%;
      height: 100%;
      padding: 20px;

      .inner {
        width: 100%;

        .inner-header {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          width: 100%;
          padding: 15px 20px;
          border-bottom: 1px solid #F0F0F0;
          margin-bottom: 10px;
          position: relative;
          background: #fff;
        }
      }

      &:nth-child(2) {
        width: 30%;
        padding-left: 0;
        // border-left: 1px solid #F0F0F0;
      }
    }
  }

  button {
    background-color: $purple;
    padding: 8px 10px;
    text-align: center;
    font-size: 12px;
    width: 120px;
    border-radius: 2px;
    color: #fff;
    font-weight: 800;
    cursor: pointer;

    @extend .btn-purple
  }

  .dashboard-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    margin-bottom: 2px;
    position: relative;

    div, canvas {
      width: 100%;
    }
  }

  .stats-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 10px;
    position: relative;

    .stat-container,
    .activity-container {
      background-color: #fff;
      width: calc(20% - 10px);
      font-size: 12px;

      .inner {
        padding: 20px;
      }

      a {
        color: #000;
        padding: 20px;
        display: block;
        text-decoration: none;
        font-weight: 100;
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

    .activity-cell {
      margin-top: 10px;
      img {
        width: 24px;
        border-radius: 50%;
        border: 1px solid $purple;
      }
    }
  }

  .search {
    width: 100%;
    height: 100%;
    .input-search {
      width: 100%;
      font-size: 16px;
      height: 100%;
      padding-left: 20px;
      border: 0;

      &:focus {
        outline: 0;
      }
    }
  }
}
</style>
