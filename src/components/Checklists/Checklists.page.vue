<template lang="html">
  <div class="checklists-page">
    <div class="flex-container">
      <div class="col">
        <div class="inner">
          <div class="inner-header">
            <h2 class="title">All checklists</h2>
            <button type="button" @click="$modal.show('add-checklist')">New checklist</button>
          </div>
          <div class="checklists-container">
            <Card v-for="checklist in checklists" :data="checklist" :name="name"></Card>
          </div>
        </div>
      </div>
      <!-- <div class="col">
        <AddChecklist></AddChecklist>
      </div> -->
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
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
  }
}
</style>
