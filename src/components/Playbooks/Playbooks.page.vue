<template lang="html">
  <div class="playbooks-page">
    <div class="playbooks-page-header">
      <h2 class="title">Playbooks</h2>
      <!-- <button type="button" name="button"><span class="glyphicon glyphicon-plus"></span> Add playbook</button> -->
    </div>
    <div class="flex-container">
      <div class="col">
        <ChoosePlaybook :playbooks="playbooks" @showPlaybook="showPlaybook"></ChoosePlaybook>
      </div>
      <div class="col">
        <h3 class="title-second">Phases</h3>
        <div class="playbooks-container">

          {{playbooktoShow}}
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
import ChoosePlaybook from './ChoosePlaybook'

export default {
  name: 'PlaybooksPage',
  components: {
    Card,
    AddPlaybook,
    ChoosePlaybook
  },
  data() {
    return {
      name: 'playbook',
      playbooktoShow: ''
    }
  },
  firestore() {
    return {
      playbooks: db.collection('playbooks')
    }
  },
  methods: {
    showPlaybook(key) {
      console.log(this.$firestore.playbooks.doc(key))

      this.playbooktoShow = this.$firestore.playbooks.doc(key)
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

<style scoped lang="scss">
  .playbooks-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 17px 35px;

    .playbooks-page-header {
      width: 100%;
    }

    .title {
      font-weight: 700;
      margin: 0;
      margin-bottom: 20px;
      font-size: 38px;
      font-weight: 500;
      color: #233539;
      letter-spacing: -1.09px;
      display: inline-block;
      margin-right: 10px;
    }

    .title-second {
      font-size: 11px;
      text-transform: uppercase;
      margin: 0;
      margin-bottom: 20px;
    }

    .flex-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 100%;

      .col {
        width: calc(20% - 10px);
        padding: 40px;
        height: 90%;
        margin-right: 20px;
        background-color: #fff;
        border-radius: 6px;
        box-shadow: 0 2px 9px 0 rgba(0,0,0,0.03);
        overflow: scroll;

        &:nth-child(1) {
          padding: 26px;
        }

        &:nth-child(2) {
          width: calc(60% - 10px);
        }

        &:nth-child(3) {
          width: calc(20% - 10px);
          border-left: 1px solid #F0F0F0;
          margin-right: 0;
          height: 180px;
        }
      }
    }

    button {
      display: inline-block;
      background-color: #4DA1FF;
      max-width: 140px;
      padding: 4px 10px;
      color: #fff;
      border-radius: 2px;
      font-weight: 100;
      span {
        color: #fff;
      }
    }

    .playbooks-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
</style>
