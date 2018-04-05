<template lang="html">
  <div class="checklists-page">
    <div class="flex-container">
      <div class="col">
        <h2 class="title">Checklists page</h2>
        <div class="checklists-container">
          <Card v-for="checklist in checklists" :data="checklist" :name="name"></Card>
        </div>
      </div>
      <div class="col">
        <AddChecklist></AddChecklist>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase'
import Card from '../Card/Card'
import AddChecklist from './AddChecklist'
export default {
  name: 'ChecklistsPage',
  components: {
    Card,
    AddChecklist
  },
  data() {
    return {
      name: 'checklist'
    }
  },
  firestore() {
    return {
      checklists: db.collection('checklists')
    }
  }
}
</script>

<style scoped lang="scss">
  .checklists-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #fff;

    .title {
      font-weight: 700;
      margin: 0 0 20px 0;
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

    .checklists-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
</style>
