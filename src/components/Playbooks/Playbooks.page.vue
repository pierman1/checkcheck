<template lang="html">
  <div class="playbooks-page">
    <div class="flex-container">
      <div class="col">
        <h2 class="title">Playbooks page</h2>

        <div class="playbooks-container">
          <Card v-for="playbook in playbooks" :data="playbook" :name="name"></Card>
        </div>
      </div>
      <div class="col">
        <AddPlaybook></AddPlaybook>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../../firebase'
import Card from '../Card/Card.vue'
import AddPlaybook from './AddPlaybook'
export default {
  name: 'PlaybooksPage',
  components: {
    Card,
    AddPlaybook
  },
  data() {
    return {
      name: 'playbook'
    }
  },
  firestore() {
    return {
      playbooks: db.collection('playbooks')
    }
  },
  created() {
    console.log(this.playbooks);

    var data = [{ id: 0, name: 'A' }, { id: 1, name: 'A' }, { id: 2, name: 'C' }, { id: 3, name: 'B' }, { id: 4, name: 'B' }];

    var countList = data.reduce(function(p, c){
      p[c.name] = (p[c.name] || 0) + 1;
      return p;
    }, {});

    var result = data.filter(function(obj){
      return countList[obj.name] > 1;
    });

    console.log(result)
    // function filterPlaybooks(playbook) {
    //   console.log(playbook);
    //   return playbook.team === 'VfuAiu5BFMVM3I0eJgym'
    // }
    //
    // var filtered = this.playbooks.filter(filterPlaybooks)
    // console.log(filtered);
  }
}
</script>

<style lang="scss">
  .playbooks-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #fff;

    .title {
      font-weight: 700;
      margin: 0;
      margin-bottom: 20px;
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

    .playbooks-container {
      display: flex;
      flex-direction: column;
    }
  }
</style>
