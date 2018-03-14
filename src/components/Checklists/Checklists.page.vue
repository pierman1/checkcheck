<template lang="html">
  <div class="checklists-page">
    <h2 class="title">Checklists page</h2>

    <div class="flex-container">
      <Card v-for="checklist in checklists" :data="checklist" :name="name"></Card>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase'
import Card from '../Card/Card'
export default {
  name: 'ChecklistsPage',
  components: {
    Card
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

<style lang="scss">
  .checklists-page {
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

    .flex-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
</style>
