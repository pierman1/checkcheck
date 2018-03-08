<template lang="html">
  <div class="team">
    <h1>Team: {{ team.name }}</h1>

    <h2>Playbooks</h2>
    <div>
      <input type="text"
        v-model="newplaybook"
        @keyup.enter="addplaybook">
      <button class="remove"  @click="addplaybook">
        Add playbook
      </button>
    </div>

    <ul class="teamList">
      <li v-for="list in lists" >
        <router-link :to="{ name: 'playbooks', params: {playbook: list['.key']} }">
          {{ list.name }}
        </router-link>

        <button @click="deleteplaybook(list)">
          Remove
        </button>
      </li>
    </ul>
  </div>

</template>

<script>
import { db } from '../../firebase';
import Card from '../Card/Card.vue'
// const db = require('firebase')
export default {
  name: 'Team',
  data() {
    return {
      playbooks: [],
      newplaybook: ''
    }
  },
  firestore() {
    return {
      team: db.collection('teams').doc(this.$route.params.id),
      playbooks: db.collection('playbooks'),
      lists: db.collection('playbooks').where('team', '==', this.$route.params.id)
    }
  },
  methods: {
    addplaybook: function() {
      this.$firestore.playbooks.add(
        {
          name: this.newplaybook,
          team: this.$route.params.id,
          timestamp: new Date()
        }
      );
      this.newteam = '';
    },
    deleteplaybook: function(playbook) {
      this.$firestore.playbooks.doc(playbook['.key']).delete();
    }
  }
}
</script>

<style scoped lang="scss">
  .team {
    padding: 20px;
    background-color: white;
    width: 100%;

    .teamList {
      list-style: none;
      padding: 0;
      margin: 10px 0;
      border: 2px;
      li {
        width: 50%;
        background-color: white;
        border: 1px solid #cecece;
        border-radius: 2px;
        padding: 10px 10px;
        list-style: none;
        margin-bottom: 20px;
        background-color: #fff;


        a {
          text-decoration: none;
          font-weight: 100px;
          color: #000;
          display: block;
          width: 100%;
          float: left;
          text-transform: capitalize;
        }

        ul {
          width: 100%;
          float: left;
          padding: 0;

          li {
            border: none;
            font-size: .7em;
            padding: 4px 0;
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>
