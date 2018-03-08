<template lang="html">
  <div class="addteam">
    Add
    <div class="form">
      <input type="text"
        v-model="newteam"
        @keyup.enter="addteam" placeholder="Team name">
      <button class="add" @click="addteam">
        <i class="glyphicon glyphicon-plus"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase'
export default {
  name:'Addteam',
  data() {
    return {
      newteam: '',
      createdBy: {},
      teams:[]
    }
  },
  firestore() {
    return {
      teams: db.collection('teams')
    }
  },
  methods: {
    addteam: function() {
      console.log(this.createdBy);

      this.$firestore.teams.add(
        {
          name: 'this.newteam',
          createdBy: {
            name: 'this.createdBy',
            uid: 'this.createdBy'
          },
          timestamp: new Date()
        }
      );
      this.newteam = '';
    }
  }
}
</script>

<style lang="css">
</style>
