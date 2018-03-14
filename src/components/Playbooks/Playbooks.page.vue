<template lang="html">
  <div class="playbooks-page">
    <h2 class="title">Playbooks page</h2>

    <!-- {{playbooks}} -->
    <!-- {{user}} -->

    <div class="flex-container">
      <Card v-for="playbook in playbooks" :data="playbook" :name="name"></Card>
    </div>
  </div>
</template>

<script>
import {db} from '../../firebase'
import Card from '../Card/Card.vue'
export default {
  name: 'PlaybooksPage',
  components: {
    Card
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
