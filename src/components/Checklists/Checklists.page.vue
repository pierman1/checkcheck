<template lang="html">
  <div class="checklists-page">
    <div class="flex-container">
      <div class="col">
        <div class="inner">
          <div class="inner-header">
            <h2 class="title">All checklists</h2>
            <div class="filter-text"  v-if="checklists.length > 0">
              filters:
            </div>
            <div class="filters-cta" @click="showFilters"  v-if="checklists.length > 0">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <button type="button" @click="$modal.show('add-checklist')">New checklist</button>
          </div>
          <div class="inner-header" v-if="filtersVisible">
            <h2 class="title">Filters</h2>
            <button type="button" class="filter" @click="showAll">All</button>
            <button type="button" class="filter" @click="filter(tag, $event)" v-for="tag in tags">{{tag.name}}</button>
          </div>
          <div class="checklists-container" v-if="!filterOn && checklists.length > 0">
            <Checklist v-for="checklist in checklists" :data="checklist" :name="name"></Checklist>
          </div>
          <div class="checklists-container" v-if="filterOn">
            <Checklist v-for="checklist in filteredChecklists" :data="checklist" :name="name"></Checklist>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase'
import Checklist from './Checklist.vue'

export default {
  name: 'ChecklistsPage',
  components: {
    Checklist
  },
  data() {
    return {
      name: 'checklist',
      filteredChecklists: [],
      filtersVisible: false,
      filterOn: false
    }
  },
  methods: {
    showFilters () {
      if (this.filtersVisible) {
        this.filtersVisible = false
      } else {
        this.filtersVisible = true
      }
    },
    filter(tag, event) {
      this.filteredChecklists = []
      this.filterOn = true
      var tagName = tag.name
      db.collection('checklists').get().then(snapshot => {
        snapshot.docs.forEach(doc => {

          var data = doc.data()

          if(data.tag.name === tagName) {
            this.filteredChecklists.push(data)
          }
        })
      })
    },
    showAll() {
      this.filterOn = false
    }
  },
  firestore() {
    return {
      checklists: db.collection('checklists').orderBy('timestamp', 'asc'),
      tags: db.collection('tags')
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/global.scss';
.checklists-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 40px;

  .title {
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

  .filter {
    @extend .btn-purple-border;
    width: auto;
    margin-left: 10px;
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

  .checklists-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}

.filter-text {
  position: absolute;
  right: 190px;
  top: 19px;
  font-weight: 100;
  color: $purple;
}
</style>
