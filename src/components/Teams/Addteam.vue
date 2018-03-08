<template lang="html">
  <div class="addteam">
    <div class="form">
      <input type="text"
        v-model="newteam"
        @keyup.enter="addteam" placeholder="New team">
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
          name: this.newteam,
          createdBy: {
            name: this.createdBy,
            uid: this.createdBy
          },
          timestamp: new Date()
        }
      );
      this.newteam = '';
    }
  }
}
</script>

<style lang="scss">
  .addteam {
    padding: 0 20px;

    input {
      border-radius: 20px;
      width: 100%;
      border: 0;
      font-size: 0.775em;
      transition: 300ms;
      padding: 5px 20px;

      &:focus {
        background-color: #D7EBFF;
        outline: 0;
      }
    }
  }
</style>
